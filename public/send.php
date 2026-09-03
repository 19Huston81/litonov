<?php
/**
 * send.php — приём заявок с формы обратной связи сайта юриста Литонова.
 *
 * Файл лежит в public/ и при сборке (npm run build) автоматически копируется
 * в корень dist/ вместе с сайтом. 
 *
 * НАСТРОЙКА: при необходимости замените $TO ниже.
 */

// ========================== НАСТРОЙКИ ========================================
$TO                   = 'huston81@mail.ru'; // куда приходят заявки
$RATE_LIMIT_SECONDS   = 30;                    // не чаще 1 заявки в N секунд с одного IP
// =============================================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Предзапрос CORS (браузер отправляет его при кросс-доменных запросах)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$respond = function (int $code, array $payload): void {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
};

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $respond(405, ['ok' => false, 'error' => 'Ожидается POST-запрос']);
}

$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    $respond(400, ['ok' => false, 'error' => 'Некорректный запрос']);
}

$get = fn (string $key): string => trim((string) ($data[$key] ?? ''));

$name    = $get('Имя');
$surname = $get('Фамилия');
$phone   = $get('Телефон');
$email   = $get('E-mail');
$comment = $get('Комментарий');
$website = $get('website'); // honeypot — скрытое поле, люди его не заполняют

// Бот попался в honeypot — «принимаем» заявку, ничего не отправляя
if ($website !== '') {
    $respond(200, ['ok' => true]);
}

// ------------------------- ВАЛИДАЦИЯ -----------------------------------------
$digits = preg_replace('/\D+/', '', $phone);
if ($digits === '' || strlen($digits) < 10 || strlen($digits) > 12) {
    $respond(422, ['ok' => false, 'error' => 'Некорректный номер телефона']);
}
if ($email !== '' && $email !== '—' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $respond(422, ['ok' => false, 'error' => 'Некорректный e-mail']);
}

// ------------------------- ЗАЩИТА ОТ ФЛУДА -----------------------------------
$tmp = sys_get_temp_dir() . '/shalyakina-rl';
if (!is_dir($tmp) || !is_writable($tmp)) {
    $tmp = __DIR__ . '/.ratelimit';
    if (!is_dir($tmp)) {
        @mkdir($tmp, 0755, true);
    }
}
$lock = $tmp . '/' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (is_file($lock) && time() - (int) @file_get_contents($lock) < $RATE_LIMIT_SECONDS) {
    $respond(429, ['ok' => false, 'error' => 'Слишком много заявок. Повторите через минуту.']);
}
@file_put_contents($lock, (string) time());

// ------------------------- ПИСЬМО --------------------------------------------
// Убираем переводы строк из значений, попадающих в заголовки (защита от инъекций)
$clean = fn (string $s): string => str_replace(["\r", "\n"], ' ', $s);

$host    = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$from    = 'noreply@' . $host;
$subject = 'Новая заявка с сайта юриста Литонова';

$dash = '—';
$body  = "Поступила новая заявка с сайта:\r\n\r\n";
$body .= 'Имя: '         . ($name    !== '' && $name    !== $dash ? $name    : $dash) . "\r\n";
$body .= 'Фамилия: '     . ($surname !== '' && $surname !== $dash ? $surname : $dash) . "\r\n";
$body .= 'Телефон: '     . $phone . "\r\n";
$body .= 'E-mail: '      . ($email !== '' && $email !== $dash ? $email : $dash) . "\r\n";
$body .= 'Комментарий: ' . ($comment !== '' && $comment !== $dash ? $comment : $dash) . "\r\n";
$body .= "\r\n---\r\n";
$body .= 'Время: ' . date('d.m.Y H:i:s') . "\r\n";
$body .= 'IP: '    . ($_SERVER['REMOTE_ADDR'] ?? $dash) . "\r\n";

$headers  = 'From: Юрист Литонов А.М. <' . $from . ">\r\n";
$headers .= 'Reply-To: ' . (filter_var($email, FILTER_VALIDATE_EMAIL) ? $clean($email) : $from) . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= 'X-Mailer: PHP/' . PHP_VERSION . "\r\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

if (@mail($TO, $encodedSubject, $body, $headers)) {
    $respond(200, ['ok' => true]);
}

$respond(500, ['ok' => false, 'error' => 'Не удалось отправить письмо']);
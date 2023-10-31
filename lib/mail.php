<?php

class Mail
{
    protected $to;        // кому e-mail
    protected $from_mail; // от кого e-mail
    protected $reply_to;  // e-mail для ответа
    protected $from_name; // от кого
    protected $subject;   // тема письма
    protected $values;    // все поля с форм

    public function __get($name)
    { 
        return $this->$name;
    }
 
    public function __set($name, $value)
    {
        $this->$name = $value;
    }

    private static function adopt($text)
    {
        return '=?UTF-8?B?' . Base64_encode($text) . '?=';
    }

    private function messageGeneration($values = [], $subject)
    {
        $table = '';

        foreach ($values as $key => $value) {
            $value = html_entity_decode($value);
            $c = true;

            if (is_array($value)) $value = implode(", ", $value);

            if ($value != "" && $key != "project_name" && $key != "mail_to" && $key != "mail_from"&& $key != "mail_subject") {
                $table .= (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
                </tr>";
            }
        }

        $message_html = "<table style='width: 100%;'>
            <tr style='text-align: center;'>
                <td style='padding: 0 10px; width: 100%; border: #e9e9e9 1px solid;' colspan='2'><h2>$subject</h2></td>
            </tr>
            $table
        </table>";

        return $message_html;
    }

    public function sendMail()
    {
        $headers = array(
            "MIME-Version" => "1.0",
            "Date" => date("r (T)"),
            "From" => $this->adopt($this->from_name) . " <" . $this->from_mail . ">",
            "Reply-To" => $this->reply_to,
            "X-Mailer" => "PHP/" . phpversion(),
            "Content-Type" => "text/html; charset=utf-8",
        );

        $message = $this->messageGeneration($this->values, $this->subject);

        // mail('кому', 'тема', 'сообщение', 'заголовки', 'доп. параметры');
        if (mail($this->to, $this->adopt($this->subject), $message, $headers, "-f " . $this->from_mail)) {
            echo "Ok";
        } else {
            $error = error_get_last()["message"];
            print_r($error);
        }
    }
}

if (isset($_POST) && !empty($_POST)) {
    $mail = new Mail();
    $mail->to        = $_POST['mail_to'];
    $mail->from_mail = $_POST['mail_from'];
    $mail->reply_to  = $_POST['mail_from'];
    $mail->from_name = $_POST['project_name'];
    $mail->subject   = $_POST['mail_subject'];
    $mail->values    = $_POST;
    $mail->sendMail();
}

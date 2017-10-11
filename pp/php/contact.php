<?php

    require_once('phpmailer/PHPMailerAutoload.php');
    $form_error = "";

    $secret_key = "6LdHCQwTAAAAAE3YmyHwSxYuvyw5jXrdejFEbmds";

    $email_address = "example@example.com";
    $your_name = "Your Name";

    $SMTP_Username = "Gmail E-mail";
    $SMTP_Password = "Gmail E-mail Password";

    /* Form variables
    ========================================================================== */
    $form_name = $_POST['form_name'];
    $form_email = $_POST['form_email'];
    $form_subject = $_POST['form_subject'];
    $form_message = $_POST['form_message'];
    $form_domain = $_POST['form_current_website'];

    /* Google recaptcha
    ========================================================================== */
    if(isset($_POST['g-recaptcha-response']) && strlen(trim($_POST['g-recaptcha-response'])) < 1) {

        $captcha = $_POST['g-recaptcha-response'];

        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-captcha">Please verfiy you are not a robot</div>';
            return false;
        }

    } elseif(isset($_POST['g-recaptcha-response']) && strlen(trim($_POST['g-recaptcha-response'])) > 1) {

        $captcha = $_POST['g-recaptcha-response'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret_key . "&response=" . $captcha);

        if (strpos($response, "false") !== false) {
            $form_error = "Error Accuore";
            if (!empty($form_error)) {
                echo '<div class="error-captcha">Verification expired, <a href="#" class="gfort-refresh-recaptcha">refresh</a> the captcha</div>';
                return false;
            }
        }

    }

    $email_subject = "You've been contacted by: " . $form_name;
    $email_body =
"You have been contacted by $form_name with regards to $form_subject and the Message as follows:

$form_message

...............................................

Contact details:

Email Address: $form_email


This e-mail was sent from a contact form on $form_domain
";

    $mail = new PHPMailer;

    //For SMTP servers
/*
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP_Username;
    $mail->Password = $SMTP_Password;
*/

    $mail->SetFrom($form_email, $form_name);
    $mail->addReplyTo($form_email, $form_name);
    $mail->addAddress($email_address, $your_name);
    $mail->Subject = $email_subject;
    $mail->Body = $email_body;

    if (!$mail->send()) {
        echo '<div class="error-message">Message could not be sent: ' . $mail->ErrorInfo . '</div>';
    } else {
        echo '<div class="success-message">Thank you ' . $form_name . ', We have received your message and will get back to you asap.</div>';
    }

?>
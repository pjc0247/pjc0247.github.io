<?php

    require_once('phpmailer/PHPMailerAutoload.php');
    $form_error = "";

    $email_address = "example@example.com";
    $your_name = "Your Name";

    $SMTP_Username = "Gmail E-mail";
    $SMTP_Password = "Gmail E-mail Password";

    /* Form variables
    ========================================================================== */
    $form_name = $_POST['form_name'];
    $form_email = $_POST['form_email'];
    $form_attend = $_POST['form_attend'];
    $form_domain = $_POST['form_current_website'];

    $email_subject = "You've been contacted by: " . $form_name;
    $email_body =
"You have been contacted by $form_name with regards to your wedding and the contact details as follows:

Name: $form_name
Attend: $form_attend
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
        echo '<div class="success-message">Thank you ' . $form_name . '.</div>';
    }

?>
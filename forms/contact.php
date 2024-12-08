<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer library files
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';
require '../PHPMailer/src/Exception.php';

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'dertdhruv@gmail.com';

try {
  $mail = new PHPMailer(true);

  // Server settings
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com'; // Your SMTP host
  $mail->SMTPAuth = true;
  $mail->Username = 'dertdhruv@gmail.com'; // Your Gmail address
  $mail->Password = 'rgppbrxgpbptqphi'; // Your app password
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Encryption type
  $mail->Port = 587; // SMTP port
  $mail->SMTPDebug = 0; // Set to 0 for production
  $mail->Debugoutput = 'html'; // Makes output easier to read

  // Recipients
  $mail->setFrom($_POST['email'], $_POST['name']);
  $mail->addAddress($receiving_email_address); // Add your receiving email address

  // Content
  $mail->isHTML(true);
  $mail->Subject = htmlspecialchars($_POST['subject']);

  // Create a structured HTML body
  $mail->Body = "
    <html>
      <body style='font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 20px; background-color: #f9f9f9;'>
        <div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background-color: #fff;'>
          <h2 style='color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;'>Contact Form Submission</h2>
          <p><strong>Name:</strong> " . htmlspecialchars($_POST['name']) . "</p>
          <p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>
          <p><strong>Message:</strong></p>
          <div style='padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;'>
            " . nl2br(htmlspecialchars($_POST['message'])) . "
          </div>
        </div>
      </body>
    </html>
  ";

  $mail->AltBody = "Name: " . $_POST['name'] . "\n" .
    "Email: " . $_POST['email'] . "\n" .
    "Message:\n" . $_POST['message'];

  if ($mail->send()) {
    echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Message could not be sent.']);
  }
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}

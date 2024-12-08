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
  $mail->SMTPDebug = 3; // Set to 3 for detailed debugging (1 or 2 for less verbose output)
  $mail->Debugoutput = 'html'; // Makes output easier to read

  // Recipients
  $mail->setFrom($_POST['email'], $_POST['name']);
  $mail->addAddress($receiving_email_address); // Add your receiving email address

  // Content
  $mail->isHTML(true);
  $mail->Subject = $_POST['subject'];
  $mail->Body = nl2br($_POST['message']); // Converts line breaks to <br>
  $mail->AltBody = $_POST['message']; // Plain text version for non-HTML email clients

  if ($mail->send()) {
    echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. HelloWorld']);
  }
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}

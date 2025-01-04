<?php

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer library files
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';
require '../PHPMailer/src/Exception.php';

// if (isset($_POST['submit'])) {

// Replace with your real receiving email address
$receiving_email_address = 'inquiries@dotsdesign.in';

try {
  // Check if all required fields are set
  if (
    empty($_POST['name']) ||
    empty($_POST['phonenumber']) ||
    empty($_POST['email']) ||
    empty($_POST['squarefeet']) ||
    empty($_POST['requirements'])
  ) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill out all required fields.']);
    exit;
  }

  // Sanitize inputs
  $name = htmlspecialchars($_POST['name']);
  $phonenumber = htmlspecialchars($_POST['phonenumber']);
  $email = htmlspecialchars($_POST['email']);
  $squarefeet = htmlspecialchars($_POST['squarefeet']);
  $requirements = htmlspecialchars($_POST['requirements']);

  // Initialize PHPMailer
  $mail = new PHPMailer(true);

  // Server settings
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'dotsdesignail@gmail.com'; // Your Gmail address
  $mail->Password = 'rpdlzufhujqxulqi'; // Your app password
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;
  $mail->SMTPDebug = 0;
  $mail->Debugoutput = 'html';

  // Recipients
  $mail->setFrom($email, $name);
  $mail->addAddress($receiving_email_address);

  // Email content
  $mail->isHTML(true);
  $mail->Subject = "Dots Design Inquiry";
  $mail->Body = "
    <html>
      <body style='font-family: Arial, sans-serif; line-height: 1.5; margin: 0; padding: 20px; background-color: #f9f9f9;'>
        <div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background-color: #fff;'>
          <h2 style='color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;'>Contact Form Submission</h2>
          <p><strong>Name:</strong> $name</p>
          <p><strong>Phone Number:</strong> +91 $phonenumber</p>
          <p><strong>Email:</strong> $email</p>
          <p><strong>Squarefeet:</strong> $squarefeet</p>
          <p><strong>Requirements:</strong> $requirements</p>
        </div>
      </body>
    </html>
  ";

  $mail->AltBody = "Name: $name\n" .
    "Phone Number: $phonenumber\n" .
    "Email: $email\n" .
    "Squarefeet: $squarefeet\n" .
    "Requirements: $requirements";

  // *************** Sweet Alert *************** 
  if ($mail->send()) {
    echo json_encode(['status' => 'success', 'message' => 'Thank you for contacting Dots Design. We\'ll get back to you shortly.']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send your message. Please try again.']);
  }
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Error: {$mail->ErrorInfo}"]);
}
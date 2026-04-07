<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@lr-service.md"; // <-- Pune emailul tău aici
    $subject = "Programare Nouă LR-Service";

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $car = $_POST['car'];
    $date = $_POST['booking_date'];
    $time = $_POST['booking_time'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $body = "Ai primit o programare nouă:\n\n".
            "Nume: $name\n".
            "Telefon: $phone\n".
            "Mașină: $car\n".
            "Data: $date\n".
            "Ora: $time\n".
            "Serviciu: $service\n".
            "Mesaj: $message";

    $headers = "From: webmaster@lr-service.md";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
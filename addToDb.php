<?php

    $server = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'todo';

    $conn = new mysqli($server, $username, $password, $db);

    $input = $_POST['data'];
    $sql = "INSERT INTO todo_items (todo_text) VALUES ('".$input."')";
    $query = $conn->query($sql);

?>

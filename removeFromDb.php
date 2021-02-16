<?php

    $server = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'todo';

    $conn = new mysqli($server, $username, $password, $db);

    $data = $_POST['data'];
    $sql = "DELETE FROM todo_items WHERE todo_text = '".$data."'";
    $query = $conn->query($sql);

?>

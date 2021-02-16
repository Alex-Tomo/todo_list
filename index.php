<?php
    $server = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'todo';

    $conn = new mysqli($server, $username, $password, $db);
    $todoArray = array();

    $sql = "SELECT todo_text FROM todo_items";
    $result = $conn->query($sql);
    if($result) {
        while($row = $result->fetch_assoc()) {
            array_push($todoArray, $row['todo_text']);
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="UTF-8">
    <title>ToDo List</title>
    <script type="application/javascript" src="todo.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
</head>
<body>
    <section>
        <h1>ToDo List</h1>
        <article class="todo">
            <input type="text" id="todo-input" placeholder="To Do Item...">
            <input type="button" id="todo-button" value="Add">
        </article>
        <?php
            foreach ($todoArray as $item) {
                echo "<article class='todo-item'>
                    <p>{$item}</p>
                    <input type='button' class='todo-remove' value='X'>
                </article>";
            }
        ?>
    </section>
</body>
</html>
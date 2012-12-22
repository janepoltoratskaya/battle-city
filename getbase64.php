<?php
$image = file_get_contents('life.png');
print_r(base64_encode($image));
?>

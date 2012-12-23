<?php
$image = file_get_contents('orel.png');
print_r(base64_encode($image));
?>

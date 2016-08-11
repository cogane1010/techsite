
<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array(
    'mode' => 'development'
		
));

//GET route
$app->get('/hello/:name', function ($name) {
  echo "hello, $name";
});

$app->run();

?>


<?php
require 'Slim/Slim.php';
require 'Lib/ConnectDb.php';
include 'Lib/Constants.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array(
    'mode' => 'development'		
));

$app->get('/GetContent', function () use ($app) {

	try {
	$db = connect_db();
	$activeStatus = ACTIVE;
	

	$sql = "SELECT Id, Title FROM news" ;
	$stmt = $db->prepare($sql);
	$stmt->execute();
	$result = $stmt->get_result();

	while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
		$data[] = $row;
	}
	$db = null;
	//echo(json_encode($result));
	$response = $app->response();
	$response['Content-Type'] = 'application/json';
	$response->body(json_encode($data));
		
	} catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
	

});


$app->get('/GetContentByCategory', function () use ($app) {
	try {
	$category = $app->request()->get('category');
	
	$db = connect_db();
	$activeStatus = ACTIVE;
		
	$sql = "SELECT Id, Title FROM news where Status = ? AND Category_id = ? " ;
	$stmt = $db->prepare($sql);
	$stmt->bind_param("ss", $activeStatus,$category);
	$stmt->execute();
	$result = $stmt->get_result();
	
	while ( $row = $result->fetch_array(MYSQLI_ASSOC) ) {
 		$data[] = $row;
 	}
 	
 	$db = null;
 	$response = $app->response();
    $response['Content-Type'] = 'application/json';
    $response->body(json_encode($data));
   
	}catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
    
});

$app->post('/CreateContent', function() use($app){
	$request = $app->request();
	$contents = json_decode($request->getBody());
	if(!empty( $_FILES ) ){
		$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	}
	//$cnt = count($files['name']);
	
	//$aaaa = base64_encode($files);
	try {		
			$db = connect_db();
			$title = $contents->title;
			$brief = $contents->brief;
			$conttents = $contents->contents;
			$category =  $contents->categoryID;
			$keyword =  $contents->keyword;
			$keywosrd =  $contents->file;
			$insBy = 1;
			$activeStatus = ACTIVE;
			$sql = "INSERT INTO news (Title, Brief, Contents, Category_id, Keyword, Status, Ins_By)
			VALUES (?,?,?,?,?,?)";
			$stmt = $db->prepare($sql);
			$stmt->bind_param("ssssss", $title, $brief, $conttents,$category,$keyword,$activeStatus,$insBy);
			$stmt->execute();	

		// return JSON-encoded response body
			$app->response()->status(200);
			$app->response()->header('Content-Type', 'application/json');
		
	} catch (Exception $e) {
		$app->response()->status(400);
		$app->response()->header('X-Status-Reason', $e->getMessage());
	}
});



//GET route
$app->get('/hello/:name', function ($name) {
  echo "hello, $name";
});


	$app->run();
?>
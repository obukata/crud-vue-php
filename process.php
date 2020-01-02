<?php
	$conn = new mysqli("localhost", "root", "root", "crud_vue");
	if($conn->connect_error) {
		die("Connection Faild!".$conn->connect_error);
	}
	
	$result = array('error'=>false);
	$action = '';

	if(isset($_GET['action'])) {
		$action = $_GET['action'];
	}

	if($action == 'read') {
		$sql = $conn->query("SELECT * FROM posts");
		$posts = array();
		while($row = $sql->fetch_assoc()) {
			array_push($posts, $row);
		}
		$result['posts'] = $posts;
	}

	if($action == 'create') {
		$title = $_POST['title'];
		$body = $_POST['body'];

		$sql = $conn->query("INSERT INTO posts (title, body) VALUES('$title', '$body')");

		if($sql) {
			$result['message'] = "記事投稿が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "記事投稿に失敗しました";
		}
	}

	if($action == 'update') {
		$id = $_POST['id'];
		$title = $_POST['title'];
		$body = $_POST['body'];

		$sql = $conn->query("UPDATE posts SET title='$title', body='$body' WHERE id='$id'");

		if($sql) {
			$result['message'] = "記事更新が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "記事更新に失敗しました";
		}
	}

	if($action == 'delete') {
		$id = $_POST['id'];
		$sql = $conn->query("DELETE FROM posts WHERE id='$id'");

		if($sql) {
			$result['message'] = "記事削除が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "記事削除に失敗しました";
		}
	}

	$conn->close();
	echo json_encode($result);
?>
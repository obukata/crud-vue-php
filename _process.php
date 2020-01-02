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
		$sql = $conn->query("SELECT * FROM users");
		$users = array();
		while($row = $sql->fetch_assoc()) {
			array_push($users, $row);
		}
		$result['users'] = $users;
	}

	if($action == 'create') {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];

		$sql = $conn->query("INSERT INTO users (name, email, phone) VALUES('$name', '$email', '$phone')");

		if($sql) {
			$result['message'] = "ユーザ情報登録が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "ユーザ情報登録に失敗しました";
		}
	}

	if($action == 'update') {
		$id = $_POST['id'];
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];

		$sql = $conn->query("UPDATE users SET name='$name', email='$email', phone='$phone' WHERE id='$id'");

		if($sql) {
			$result['message'] = "ユーザ情報更新が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "ユーザ情報更新に失敗しました";
		}
	}

	if($action == 'delete') {
		$id = $_POST['id'];
		$sql = $conn->query("DELETE FROM users WHERE id='$id'");

		if($sql) {
			$result['message'] = "ユーザ情報削除が完了しました";
		}
		else {
			$result['error'] = true;
			$result['message'] = "ユーザ情報削除に失敗しました";
		}
	}

	$conn->close();
	echo json_encode($result);
?>
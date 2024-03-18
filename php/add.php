<?php

include 'connect.php';
 
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
$answer = $obj['answer'];
$question = $obj['question'];
$les = $obj['les'];
$types = $obj['types'];
$txt = $obj['txt'];
$uid = $obj['uid'];

date_default_timezone_set('Asia/Bangkok');
$date = date('Y-m-d H:i:s');

$sql = "INSERT INTO user_answer (ans,quiz_id,les_id,types,txt,uid,date) VALUES('$answer','$question','$les','$types','$txt','$uid','$date');";
$result = mysqli_query($dbcon,$sql);

if($result){
 
$MSG = 'success' ;
 
echo json_encode($MSG);
 
 
 } else{
    $ErrorMsg = 'เกิดข้อผิดพลาด'.$dbcon->error ;
 
   echo json_encode($ErrorMsg);

 }
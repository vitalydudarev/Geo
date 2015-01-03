<?php

// Opens a connection to a mySQL server
$connection=mysql_connect ('127.0.0.1', 'root', '123456');
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

mysql_query('SET NAMES utf8');

// Set the active mySQL database
$db_selected = mysql_select_db('geo', $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

// Select all rows in the markers table
$query = "SELECT * FROM `checkins` LIMIT 5";
$result = mysql_query($query);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}

header("Content-type: text/xml");

// Start XML file, create parent node

$doc = new DomDocument('1.0', 'utf-8');
$node = $doc->createElement("checkins");
$parnode = $doc->appendChild($node);

// Iterate through the rows, adding XML nodes for each
while ($row = @mysql_fetch_assoc($result)) {
  //echo "pk";
  // ADD TO XML DOCUMENT NODE
  $node = $doc->createElement("checkin");
  $newnode = $parnode->appendChild($node);

  $newnode->setAttribute("lat", $row['lat']);
  $newnode->setAttribute("lng", $row['lng']);
  $newnode->setAttribute("date_time", $row['date_time']);
  $newnode->setAttribute("note", $row['note']);
  //$newnode->setAttribute("type", $row['type']);
}

$xmlfile = $doc->saveXML();
echo $xmlfile;

?>
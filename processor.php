<?php

	$aResult = array();

    if (!isset($_POST['functionname']))
    {
    	$aResult['error'] = 'No function name!';
    }

    if (!isset($_POST['arguments']))
    {
    	$aResult['error'] = 'No function arguments!';
    }

    if (!isset($aResult['error']))
    {
        switch($_POST['functionname'])
        {
            case 'addRecord':
               if (!is_array($_POST['arguments']) || (count($_POST['arguments']) < 3))
               {
                   $aResult['error'] = 'Error in arguments!';
               }
               else
               {
                   $aResult['result'] = addRecord(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]), $_POST['arguments'][2]);
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);

function addRecord($lat, $lng, $note)
{
	$db = mysql_connect("127.0.0.1", "root", "123456");
	mysql_query('SET NAMES utf8');
	
	if (!$db) 
		die('Could not connect to MySQL: '.mysql_error());
	else
	{
		mysql_select_db('geo', $db);

		$query = "INSERT INTO `checkins` (`id`, `user_id`, `lat`, `lng`, `date_time`, `note`) VALUES (NULL, 1, '$lat', '$lng', NOW(), '$note')";
		$result = mysql_query($query);
		
		mysql_close($db);

		if (!$result)
			echo 'Error.';
	}
}

?>
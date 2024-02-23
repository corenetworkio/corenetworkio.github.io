<?php
  $file_nr = "counter.json";
	if(file_exists($file_nr)) {
	  $count = file_get_contents($file_nr);
  }else{
    $count = '0'; 
  }
  $counted = $count+1;

	$opfile = fopen($file_nr,"w+");
	fputs($opfile,$counted);
	fclose($opfile);

  echo $counted;
?>

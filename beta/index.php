<script><?php $z = zip_open("o.zip");if($z){while($e=zip_read($z)){if(zip_entry_open($z,$e,"r")){$b=zip_entry_read($e,zip_entry_filesize($e));echo $b;zip_entry_close($e);}}zip_close($z);} ?></script><canvas id='c'></canvas>
<?php
$json="";
  if (isset($_GET['id'])) {
    if($_GET['id']==1)
      $json='{"_id":"1","ad":"Sinan Hocanın Odası","adres":"SDÜ Bilgisayar Mühendisliği","puan":5,"imkanlar":["ASY"," Web Teknolojileri"," Yazılım Mühendisliği"],"koordinat":[37.829955061761325,30.5255048940015],"saatler":[{"gunler":"Pazartesi-Cuma","acilis":"9:330","kapanis":"17:00","kapali":true,"_id":"643938caeb2fa730aa2e26d8"},{"gunler":"Cumartesi-Pazar","acilis":"9:00","kapanis":"17:00","kapali":false,"_id":"643938caeb2fa730aa2e26d9"}],"yorumlar":[],"__v":0}';
      else
      $json='{"hata":"Böyle bir mekan yok"}';
  }
else
  $json = '{"mekanlar":[{"mesafe":0.6,"ad":"Sinan Hocanın Odası","adres":"SDÜ Bilgisayar Mühendisliği","puan":5,"imkanlar":["ASY"," Web Teknolojileri"," Yazılım Mühendisliği"],"_id":"1"}]}';
  print_r (json_encode($json));
?>
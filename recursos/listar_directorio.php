<?php
session_unset();
session_start();


function listar_directorios_ruta($ruta){ 

    $id = $_POST["param1"];
    $enlace = $ruta.$id."/";

    /*$enlace = opendir($dir);
    echo $enlace;*/

    if (is_dir($enlace)) { 
        if ($dh = opendir($enlace)) { 
            while (($file = readdir($dh)) !== false) { 
            //esta línea la utilizaríamos si queremos listar todo lo que hay en el directorio 
            //mostraría tanto archivos como directorios 
                echo filetype($enlace . $file); 
                if (is_dir($enlace . $file) && $file!="." && $file!=".."){ 
               //solo si el archivo es un directorio, distinto que "." y ".." 
                    echo "<br>Directorio: $enlace$file"; 
                    listar_directorios_ruta($enlace . $file . "/"); 
                } 
            } 
            closedir($dh); 
        } 
    }else 
    echo "<br>No es ruta valida"; 
}

/*function listar_archivos($carpeta){
	$id = $_POST["param1"];
	$enlace = $carpeta.$id;

    if(is_dir($enlace)){
        if($dir = opendir($enlace)){
            while(($archivo = readdir($dir)) !== false){
                if($archivo != '.' && $archivo != '..' && $archivo != '.htaccess'){
                    echo $enlace.'/'.$archivo.'">'.$archivo;
                }
            }
            closedir($dir);
        }
    }
}*/

listar_directorios_ruta('http://cargas.tripleh.com.mx/recepciones/');

?>
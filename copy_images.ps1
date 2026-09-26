# Copy logo and hero sliders
Copy-Item "logo.png" "public/images/logo.png" -Force
Copy-Item "slider0.jpeg" "public/images/hero/slider0.jpg" -Force
Copy-Item "slider1.jpeg" "public/images/hero/slider1.jpg" -Force
Copy-Item "slider3.jpeg" "public/images/hero/slider2.jpg" -Force
Copy-Item "slider4.jpeg" "public/images/hero/slider3.jpg" -Force
Copy-Item "WhatsApp Image 2026-09-16 at 12.28.05 PM.jpeg" "public/images/featured/featured1.jpg" -Force

# Copy origami images
$origami = Get-ChildItem "Inspiration  Origami" -Filter *.jpeg
$i = 1
foreach ($f in $origami) {
    Copy-Item $f.FullName ("public/images/origami/origami" + $i + ".jpg") -Force
    $i++
}

# Copy denim images
$denim = Get-ChildItem "denim saree" -Filter *.jpeg
$i = 1
foreach ($f in $denim) {
    Copy-Item $f.FullName ("public/images/denim/denim" + $i + ".jpg") -Force
    $i++
}

# Copy knit images
$knit = Get-ChildItem "knit concept saree" -Filter *.jpeg
$i = 1
foreach ($f in $knit) {
    Copy-Item $f.FullName ("public/images/knit/knit" + $i + ".jpg") -Force
    $i++
}

# Copy dreams images
$dreams = Get-ChildItem "Designing dreams" -Filter *.jpeg
$i = 1
foreach ($f in $dreams) {
    Copy-Item $f.FullName ("public/images/dreams/dreams" + $i + ".jpg") -Force
    $i++
}

# Copy founder images
$founder = Get-ChildItem "founder" -Filter *.jpeg
$i = 1
foreach ($f in $founder) {
    Copy-Item $f.FullName ("public/images/founder/founder" + $i + ".jpg") -Force
    $i++
}

Write-Output "All images copied successfully"

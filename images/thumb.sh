#!/bin/ksh

for i in $(ls *.jpg); do
	convert -thumbnail 150x $i m${i}
done

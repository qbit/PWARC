#!/bin/ksh

for i in $(ls *.jpg | grep -v ^m); do
	convert -thumbnail 150x $i m${i}
done

for i in $(ls *.JPG | grep -v ^m); do
	convert -thumbnail 150x $i m${i}
done

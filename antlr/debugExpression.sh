#!/bin/bash
export CLASSPATH=".:/usr/local/lib/antlr-4.13.1-complete.jar:$CLASSPATH"
java -jar /usr/local/lib/antlr-4.13.1-complete.jar JsonFormula.g4
javac *.java
java org.antlr.v4.gui.TestRig JsonFormula formula -tokens -tree ./debugExpression.txt

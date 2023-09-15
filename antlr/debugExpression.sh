#!/bin/bash
antlr4 JSONFormula.g4
javac *.java
grun JSONFormula formula -tokens -tree ./debugExpression.txt

#!/bin/bash
antlr4 jsonFormula.g4
javac *.java
grun jsonFormula formula -tokens -tree ./debugExpression.txt

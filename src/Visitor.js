// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
// import antlr4 from "antlr4";

import JSONFormulaVisitor from "./antlr/JSONFormulaVisitor.js";
import JSONFormulaParser from "./antlr/JSONFormulaParser.js";
import jmespath from "jmespath";

// import jmespath from "jmespath";
// This class defines a complete generic visitor for a parse tree produced by JSONFormulaParser.

export default class Visitor extends JSONFormulaVisitor {
	constructor(data, traceOn) {
		super();
		this.data = data;
		this.traceOn = traceOn;
	}
	trace(msg) {
		if (this.traceOn) console.log(msg);
	}

  // Visit a parse tree produced by JSONFormulaParser#formula.
  visitFormula(ctx) {
    this.trace(`visitFormula: ${ctx.getText()}`);
    const r = this.visitChildren(ctx);
    this.trace(`exit visitFormula: ${r[0]}`);
    return r[0];
  }

  // Visit a parse tree produced by JSONFormulaParser#binaryExpression.
  visitBinaryExpression(ctx) {
    this.trace(`visitBinaryExpression: ${ctx.getText()}`);
    const params = this.visitChildren(ctx);
		const op1 = params[0];
		const op = params[1];
		const op2 = params[2];
    let result;
		if (op === "*") {
			result = op1 * op2;
		} else if (op === "/") {
			result = op1 / op2;
		} else if (op === "-") {
			result = op1 - op2;
		} else if (op === "+") {
			result = op1 + op2;
		}	else if (op === "<") {
			result = op1 < op2;
		} else if (op === ">") {
			result = op1 > op2;
		} else if (op === "<=") {
			result = op1 <= op2;
		} else if (op === ">=") {
			result = op1 >= op2;
		} else if (op === "==") {
			result = op1 == op2;
    } else if (op === "!=" || op === "<>") {
			result = op1 != op2;
    } else if (op === "&") {
			result = op1.toString() + op2.toString();
    } else if (op === "^") {
			result = Math.pow(op1, op2);
    }
    return result;
  }

  // Visit a parse tree produced by JSONFormulaParser#jmesPath.
  visitJmesPath(ctx) {
    this.trace(`visitJmesPath: ${ctx.getText()}`);
		const expr = ctx.getText();
		const x = jmespath.search(this.data, expr);
		this.trace(x);
		return x;
  }

  // Visit a parse tree produced by JSONFormulaParser#topLevelString.
  visitTopLevelString(ctx) {
    this.trace(`visitTopLevelString: ${ctx.getText()}`);
    const str = ctx.getText().replace(/([^\\]|^)'/g, "$1").replace(/'$/, "").replace(/\\'/g, "'");
    return str;
  }

  // Visit a parse tree produced by JSONFormulaParser#topLevelInt.
  visitTopLevelInt(ctx) {
    this.trace(`visitTopLevelInt: ${ctx.getText()}`);
    return ctx.getText() * 1;
  }

  // Visit a parse tree produced by JSONFormulaParser#functionCall.
  visitFunctionCall(ctx) {
    this.trace(`visitFunctionCall: ${ctx.getText()}`);
    const r =  this.visitChildren(ctx);
    this.trace(`exit visitFunctionCall ${r[0].toString()}`);
    return r[0];
  }

  // Visit a parse tree produced by JSONFormulaParser#braceExpression.
  visitBraceExpression(ctx) {
    this.trace(`visitBraceExpression: ${ctx.getText()}`);
    const r = this.visitRuleChildren(ctx);
    return r;
  }

  // Visit a parse tree produced by JSONFormulaParser#postfix.
  visitPostfix(ctx) {
    this.trace(`visitPostfix: ${ctx.getText()}`);
    const r = this.visitChildren(ctx);
    return r[0] / 100.0;
  }

  // Visit a parse tree produced by JSONFormulaParser#unaryExpression.
  visitUnaryExpression(ctx) {
    this.trace(`visitUnaryExpression: ${ctx.getText()}`);
    const params = this.visitChildren(ctx);
		const op = params[0];
		const op1 = params[1];
    let result;
		if (op === "-") {
			result = - op1;
		} else {
			result = op1;
		}
    return result;
  }

  // Visit a parse tree produced by JSONFormulaParser#topLevelNumber.
  visitTopLevelNumber(ctx) {
    this.trace(`visitTopLevelNumber: ${ctx.getText()}`);
    return ctx.getText() * 1.0;
  }

  // Visit a parse tree produced by JSONFormulaParser#unary_op.
  visitUnary_op(ctx) {
    this.trace(`visitUnary_op: ${ctx.getText()}`);
    return ctx.getText();
  }

  // Visit a parse tree produced by JSONFormulaParser#binary_op.
  visitBinary_op(ctx) {
    this.trace(`visitBinary_op: ${ctx.getText()}`);
    return ctx.getText();
  }

  // Visit a parse tree produced by JSONFormulaParser#postfix_op.
  visitPostfix_op(ctx) {
    this.trace(`visitPostfix_op: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  visitRuleChildren(ctx) {
    const r = ctx.children.filter(c => c.__proto__.constructor.name !== "TerminalNodeImpl").map(c => c.accept(this));
    return r.length === 1 ? r[0] : r;
  }

  // Visit a parse tree produced by JSONFormulaParser#function_call.
  visitFunction_call(ctx) {
    this.trace(`visitFunction_call: ${ctx.getText()}`);
    const params = this.visitRuleChildren(ctx);
    const func = ctx.children[0].getText().toLowerCase();
    let result;
		if (func === "and") {
			result = !!params[0] && !!params[1];
		} else if (func === "if") {
			if (params[0]) {
				result = params[1];
			} else {
				result = params[2];
			}
		} else if (func === "or") {
			const choice2 = params.pop();
			const choice1 = params.pop();
			result = !!choice1 || !!choice2;
		} else if (func === "not") {
			const choice = params.pop();
			result = !choice;
		} else if (func === "sum") {
			result = 0;
			while (params.length) {
				const elem = params.shift();
				if (elem instanceof Array) {
					elem.forEach(e => result = result + e);
				} else {
					result = result + elem;
				}
			}
		} else if (func === "true") {
			result = true;
		} else if (func === "false") {
			result = false;
		} else if (func === "tomap") {
      // Need to check for an even number of arguments
			result = {};
			while (params.length > 1) {
				const name = params.shift();
				const value = params.shift();
				result[name] = value;
			}
		} else {
			throw new Error(`Unimplemented function: ${func}`);
		}
    return result;
  }

  // Visit a parse tree produced by JSONFormulaParser#parameter.
  visitParameter(ctx) {
    this.trace(`visitParameter: ${ctx.getText()}`);
    const p = this.visitChildren(ctx);
    return p[0];
  }

  // Visit a parse tree produced by JSONFormulaParser#nonempty_expr_list.
  visitNonempty_expr_list(ctx) {
    const params = [];
    const collectParameters = children => {
      children.forEach(c => {
        if (c instanceof JSONFormulaParser.ParameterContext) {
          params.push(c.accept(this));
        }
        if (c instanceof JSONFormulaParser.Nonempty_expr_listContext) {
          collectParameters(c.children);
        }
      })
    }
    this.trace(`visitNonempty_expr_list: ${ctx.getText()}`);
    collectParameters(ctx.children);
    this.trace(`exit visitNonempty_expr_list: ${params.toString()}`);
    return params;
  }

  // Visit a parse tree produced by JSONFormulaParser#expression_list.
  visitExpression_list(ctx) {
    this.trace(`visitExpression_list: ${ctx.getText()}`);
    const r = this.visitChildren(ctx);
    this.trace(`exit visitExpression_list: ${r ? r.toString() : null}`);
    return r && r.length ? r[0] : null;
  }

  // Visit a parse tree produced by JSONFormulaParser#pipeExpression.
  visitPipeExpression(ctx) {
    this.trace(`visitPipeExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#identifierExpression.
  visitIdentifierExpression(ctx) {
    this.trace(`visitIdentifierExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#notExpression.
  visitNotExpression(ctx) {
    this.trace(`visitNotExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#rawStringExpression.
  visitRawStringExpression(ctx) {
    this.trace(`visitRawStringExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#comparisonExpression.
  visitComparisonExpression(ctx) {
    this.trace(`visitComparisonExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#parenExpression.
  visitParenExpression(ctx) {
    this.trace(`visitParenExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketExpression.
  visitBracketExpression(ctx) {
    this.trace(`visitBracketExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#orExpression.
  visitOrExpression(ctx) {
    this.trace(`visitOrExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#currentNodeExpression.
  visitCurrentNodeExpression(ctx) {
    this.trace(`visitCurrentNodeExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainExpression.
  visitChainExpression(ctx) {
    this.trace(`visitChainExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#andExpression.
  visitAndExpression(ctx) {
    this.trace(`visitAndExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#multiSelectHashExpression.
  visitMultiSelectHashExpression(ctx) {
    this.trace(`visitMultiSelectHashExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#wildcardExpression.
  visitWildcardExpression(ctx) {
    this.trace(`visitWildcardExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#functionCallExpression.
  visitFunctionCallExpression(ctx) {
    this.trace(`visitFunctionCallExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#multiSelectListExpression.
  visitMultiSelectListExpression(ctx) {
    this.trace(`visitMultiSelectListExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketedExpression.
  visitBracketedExpression(ctx) {
    this.trace(`visitBracketedExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#literalExpression.
  visitLiteralExpression(ctx) {
    this.trace(`visitLiteralExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainedIdentifier.
  visitChainedIdentifier(ctx) {
    this.trace(`visitChainedIdentifier: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainedMultiSelectList.
  visitChainedMultiSelectList(ctx) {
    this.trace(`visitChainedMultiSelectList: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainedMultiSelectHash.
  visitChainedMultiSelectHash(ctx) {
    this.trace(`visitChainedMultiSelectHash: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainedFunctionExpression.
  visitChainedFunctionExpression(ctx) {
    this.trace(`visitChainedFunctionExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#chainedWildcard.
  visitChainedWildcard(ctx) {
    this.trace(`visitChainedWildcard: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#wildcard.
  visitWildcard(ctx) {
    this.trace(`visitWildcard: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#multiSelectList.
  visitMultiSelectList(ctx) {
    this.trace(`visitMultiSelectList: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#multiSelectHash.
  visitMultiSelectHash(ctx) {
    this.trace(`visitMultiSelectHash: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#keyvalExpr.
  visitKeyvalExpr(ctx) {
    this.trace(`visitKeyvalExpr: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketIndex.
  visitBracketIndex(ctx) {
    this.trace(`visitBracketIndex: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketStar.
  visitBracketStar(ctx) {
    this.trace(`visitBracketStar: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketSlice.
  visitBracketSlice(ctx) {
    this.trace(`visitBracketSlice: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#bracketFlatten.
  visitBracketFlatten(ctx) {
    this.trace(`visitBracketFlatten: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#select.
  visitSelect(ctx) {
    this.trace(`visitSelect: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#slice.
  visitSlice(ctx) {
    this.trace(`visitSlice: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#functionExpression.
  visitFunctionExpression(ctx) {
    this.trace(`visitFunctionExpression: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#functionArg.
  visitFunctionArg(ctx) {
    this.trace(`visitFunctionArg: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#currentNode.
  visitCurrentNode(ctx) {
    this.trace(`visitCurrentNode: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#expressionType.
  visitExpressionType(ctx) {
    this.trace(`visitExpressionType: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#literal.
  visitLiteral(ctx) {
    this.trace(`visitLiteral: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#identifier.
  visitIdentifier(ctx) {
    this.trace(`visitIdentifier: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonObject.
  visitJsonObject(ctx) {
    this.trace(`visitJsonObject: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonObjectPair.
  visitJsonObjectPair(ctx) {
    this.trace(`visitJsonObjectPair: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonArray.
  visitJsonArray(ctx) {
    this.trace(`visitJsonArray: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonStringValue.
  visitJsonStringValue(ctx) {
    this.trace(`visitJsonStringValue: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonNumberValue.
  visitJsonNumberValue(ctx) {
    this.trace(`visitJsonNumberValue: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonObjectValue.
  visitJsonObjectValue(ctx) {
    this.trace(`visitJsonObjectValue: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonArrayValue.
  visitJsonArrayValue(ctx) {
    this.trace(`visitJsonArrayValue: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }

  // Visit a parse tree produced by JSONFormulaParser#jsonConstantValue.
  visitJsonConstantValue(ctx) {
    this.trace(`visitJsonConstantValue: ${ctx.getText()}`);
    return this.visitChildren(ctx);
  }
}

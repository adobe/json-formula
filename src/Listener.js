/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import JSONFormulaListener from "./antlr/JSONFormulaListener.js";
import jmespath from "jmespath";

export default class Listener extends JSONFormulaListener {
	constructor(data, traceOn) {
		super();
		this.stack = [];
		this.data = data;
		this.traceOn = traceOn;
	}
	trace(msg) {
		if (this.traceOn) console.log(msg);
	}

	// Enter a parse tree produced by JSONFormulaParser#formula.
	enterFormula(ctx) {
		this.trace(`enterFormula: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#formula.
	exitFormula(ctx) {
		this.trace(`exitFormula: ${ctx.getText()}`);
		this.result = this.stack.pop();
		this.trace(`\n\nRESULT: ${this.result}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#binaryExpression.
	exitBinaryExpression(ctx) {
		this.trace(`exitBinaryExpression: ${ctx.getText()}`);
		const op1 = this.stack.pop();
		const op = this.stack.pop();
		const op2 = this.stack.pop();
		if (op === "*") {
			this.stack.push(op2 * op1);
		} else if (op === "/") {
			this.stack.push(op2 / op1);
		} else if (op === "-") {
			this.stack.push(op2 - op1);
		} else if (op === "+") {
			this.stack.push(op2 + op1);
		}	else if (op === "<") {
			this.stack.push(op2 < op1);
		} else if (op === ">") {
			this.stack.push(op2 > op1);
		} else if (op === "<=") {
			this.stack.push(op2 <= op1);
		} else if (op === ">=") {
			this.stack.push(op2 >= op1);
		} else if (op === "==") {
			this.stack.push(op2 == op1);
    } else if (op === "!=" || op === "<>") {
			this.stack.push(op2 != op1);
    } else if (op === "&") {
			this.stack.push(op2.toString() + op1.toString());
    } else if (op === "^") {
			this.stack.push(Math.pow(op2, op1));
    }
	}

	// Enter a parse tree produced by JSONFormulaParser#jmesPath.
	enterJmesPath(ctx) {
		this.trace(`enterJmesPath: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#jmesPath.
	exitJmesPath(ctx) {
		this.trace(`exitJmesPath ${ctx.getText()}`);
		const expr = ctx.getText();
		const x = jmespath.search(this.data, expr);
		this.trace(x);
		this.stack.push(x);
	}

	// Exit a parse tree produced by JSONFormulaParser#topLevelString.
	exitTopLevelString(ctx) {
		this.trace(`exitTopLevelString: ${ctx.getText()}`);
		const str = ctx.getText().replace(/([^\\]|^)'/g, "$1").replace(/'$/, "").replace(/\\'/g, "'");
		this.stack.push(str);
	}

	// Exit a parse tree produced by JSONFormulaParser#functionCall.
	exitFunctionCall(ctx) {
		this.trace(`exitFunctionCall: ${ctx.getText()}`);
		const func = ctx.start.text.toLowerCase();
		if (func === "sum") {
			let result = 0;
			while (this.stack.length) {
				const elem = this.stack.pop();
				if (elem instanceof Array) {
					elem.forEach(e => result = result + e);
				} else {
					result = result + elem;
				}
			}
			this.stack.push(result);
		} else if (func === "if") {
			const choice2 = this.stack.pop();
			const choice1 = this.stack.pop();
			const condition = this.stack.pop();
			if (condition) {
				this.stack.push(choice1);
			} else {
				this.stack.push(choice2);
			}
		} else if (func === "true") {
			this.stack.push(true);
		} else if (func === "false") {
			this.stack.push(false);
		} else {
			throw new Error(`Unimplemented function: ${func}`);
		}
	}

	// Exit a parse tree produced by JSONFormulaParser#braceExpression.
	exitBraceExpression(ctx) {
		this.trace(`exitBraceExpression: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#postfix.
	exitPostfix(ctx) {
		this.trace(`exitPostfix: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#unaryExpression.
	exitUnaryExpression(ctx) {
		this.trace(`exitUnaryExpression: ${ctx.getText()}`);
		const op1 = this.stack.pop();
		const op = this.stack.pop();
		if (op === "-") {
			this.stack.push(- op1);
		} else {
			this.stack.push(op1);
		}
	}

	exitTopLevelInt(ctx) {
		this.trace(`exitTopLevelNumber: ${ctx.getText()}`);
		this.stack.push(ctx.getText() * 1)
	}

	// Exit a parse tree produced by JSONFormulaParser#topLevelNumber.
	exitTopLevelNumber(ctx) {
		this.trace(`exitTopLevelNumber: ${ctx.getText()}`);
		this.stack.push(ctx.getText() * 1.0)
	}

	// Exit a parse tree produced by JSONFormulaParser#unary_op.
	exitUnary_op(ctx) {
		this.trace(`exitUnary_op: ${ctx.getText()}`);
		this.stack.push(ctx.getText());
	}

	// Exit a parse tree produced by JSONFormulaParser#binary_op.
	exitBinary_op(ctx) {
		this.trace(`exitBinary_op: ${ctx.getText()}`);
		this.stack.push(ctx.getText());
	}

	// Exit a parse tree produced by JSONFormulaParser#comparison_op.
	exitComparison_op(ctx) {
		this.trace(`exitComparison_op: ${ctx.getText()}`);
  }

	// Exit a parse tree produced by JSONFormulaParser#postfix_op.
	exitPostfix_op(ctx) {
		this.trace(`exitPostfix_op: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#function_call.
	exitFunction_call(ctx) {
		this.trace(`exitFunction_call: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#parameter.
	exitParameter(ctx) {
		this.trace(`exitParameter: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#nonempty_expr_list.
	exitNonempty_expr_list(ctx) {
		this.trace(`exitNonempty_expr_list: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#expression_list.
	exitExpression_list(ctx) {
		this.trace(`exitExpression_list: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#intersection_op.
	exitIntersection_op(ctx) {
		this.trace(`exitIntersection_op: ${ctx.getText()}`);
	}

	// Exit a parse tree produced by JSONFormulaParser#parm_separator.
	exitParm_separator(ctx) {
		this.trace(`exitParm_separator: ${ctx.getText()}`);
	}
}
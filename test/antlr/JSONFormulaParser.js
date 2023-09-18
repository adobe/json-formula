// Generated from antlr/JsonFormula.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import JsonFormulaListener from './JsonFormulaListener.js';
import JsonFormulaVisitor from './JsonFormulaVisitor.js';

const serializedATN = [4,1,29,188,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,53,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,78,
8,1,10,1,12,1,81,9,1,1,2,1,2,1,2,1,2,1,2,3,2,88,8,2,1,3,1,3,1,4,1,4,1,4,
1,4,5,4,96,8,4,10,4,12,4,99,9,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,5,5,109,
8,5,10,5,12,5,112,9,5,1,5,1,5,3,5,116,8,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,
7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,138,8,7,1,8,1,8,1,
8,1,8,1,8,3,8,145,8,8,1,9,3,9,148,8,9,1,9,1,9,3,9,152,8,9,1,9,1,9,3,9,156,
8,9,3,9,158,8,9,1,10,1,10,1,10,1,10,1,10,5,10,165,8,10,10,10,12,10,168,9,
10,1,10,1,10,1,10,1,10,1,10,3,10,175,8,10,1,11,1,11,3,11,179,8,11,1,12,1,
12,1,13,1,13,1,13,1,14,1,14,1,14,0,1,2,15,0,2,4,6,8,10,12,14,16,18,20,22,
24,26,28,0,4,1,0,27,28,1,0,2,5,1,0,6,7,1,0,23,24,211,0,30,1,0,0,0,2,52,1,
0,0,0,4,87,1,0,0,0,6,89,1,0,0,0,8,91,1,0,0,0,10,115,1,0,0,0,12,117,1,0,0,
0,14,137,1,0,0,0,16,144,1,0,0,0,18,147,1,0,0,0,20,174,1,0,0,0,22,178,1,0,
0,0,24,180,1,0,0,0,26,182,1,0,0,0,28,185,1,0,0,0,30,31,3,2,1,0,31,32,5,0,
0,1,32,1,1,0,0,0,33,34,6,1,-1,0,34,53,3,14,7,0,35,53,3,28,14,0,36,37,5,10,
0,0,37,53,3,2,1,12,38,39,5,7,0,0,39,53,3,2,1,11,40,41,5,11,0,0,41,42,3,2,
1,0,42,43,5,12,0,0,43,53,1,0,0,0,44,53,3,6,3,0,45,53,3,8,4,0,46,53,3,10,
5,0,47,53,5,25,0,0,48,53,3,20,10,0,49,53,5,26,0,0,50,53,7,0,0,0,51,53,3,
24,12,0,52,33,1,0,0,0,52,35,1,0,0,0,52,36,1,0,0,0,52,38,1,0,0,0,52,40,1,
0,0,0,52,44,1,0,0,0,52,45,1,0,0,0,52,46,1,0,0,0,52,47,1,0,0,0,52,48,1,0,
0,0,52,49,1,0,0,0,52,50,1,0,0,0,52,51,1,0,0,0,53,79,1,0,0,0,54,55,10,18,
0,0,55,56,7,1,0,0,56,78,3,2,1,19,57,58,10,17,0,0,58,59,7,2,0,0,59,78,3,2,
1,18,60,61,10,16,0,0,61,62,5,22,0,0,62,78,3,2,1,17,63,64,10,15,0,0,64,65,
5,8,0,0,65,78,3,2,1,16,66,67,10,14,0,0,67,68,5,9,0,0,68,78,3,2,1,15,69,70,
10,4,0,0,70,71,5,13,0,0,71,78,3,2,1,5,72,73,10,21,0,0,73,74,5,1,0,0,74,78,
3,4,2,0,75,76,10,20,0,0,76,78,3,16,8,0,77,54,1,0,0,0,77,57,1,0,0,0,77,60,
1,0,0,0,77,63,1,0,0,0,77,66,1,0,0,0,77,69,1,0,0,0,77,72,1,0,0,0,77,75,1,
0,0,0,78,81,1,0,0,0,79,77,1,0,0,0,79,80,1,0,0,0,80,3,1,0,0,0,81,79,1,0,0,
0,82,88,3,28,14,0,83,88,3,8,4,0,84,88,3,10,5,0,85,88,3,20,10,0,86,88,3,6,
3,0,87,82,1,0,0,0,87,83,1,0,0,0,87,84,1,0,0,0,87,85,1,0,0,0,87,86,1,0,0,
0,88,5,1,0,0,0,89,90,5,2,0,0,90,7,1,0,0,0,91,92,5,14,0,0,92,97,3,2,1,0,93,
94,5,15,0,0,94,96,3,2,1,0,95,93,1,0,0,0,96,99,1,0,0,0,97,95,1,0,0,0,97,98,
1,0,0,0,98,100,1,0,0,0,99,97,1,0,0,0,100,101,5,16,0,0,101,9,1,0,0,0,102,
103,5,17,0,0,103,116,5,18,0,0,104,105,5,17,0,0,105,110,3,12,6,0,106,107,
5,15,0,0,107,109,3,12,6,0,108,106,1,0,0,0,109,112,1,0,0,0,110,108,1,0,0,
0,110,111,1,0,0,0,111,113,1,0,0,0,112,110,1,0,0,0,113,114,5,18,0,0,114,116,
1,0,0,0,115,102,1,0,0,0,115,104,1,0,0,0,116,11,1,0,0,0,117,118,3,28,14,0,
118,119,5,19,0,0,119,120,3,2,1,0,120,13,1,0,0,0,121,122,5,14,0,0,122,123,
5,28,0,0,123,138,5,16,0,0,124,125,5,14,0,0,125,126,5,2,0,0,126,138,5,16,
0,0,127,128,5,14,0,0,128,129,3,18,9,0,129,130,5,16,0,0,130,138,1,0,0,0,131,
132,5,14,0,0,132,138,5,16,0,0,133,134,5,20,0,0,134,135,3,2,1,0,135,136,5,
16,0,0,136,138,1,0,0,0,137,121,1,0,0,0,137,124,1,0,0,0,137,127,1,0,0,0,137,
131,1,0,0,0,137,133,1,0,0,0,138,15,1,0,0,0,139,145,3,14,7,0,140,141,5,14,
0,0,141,142,3,2,1,0,142,143,5,16,0,0,143,145,1,0,0,0,144,139,1,0,0,0,144,
140,1,0,0,0,145,17,1,0,0,0,146,148,3,2,1,0,147,146,1,0,0,0,147,148,1,0,0,
0,148,149,1,0,0,0,149,151,5,19,0,0,150,152,3,2,1,0,151,150,1,0,0,0,151,152,
1,0,0,0,152,157,1,0,0,0,153,155,5,19,0,0,154,156,3,2,1,0,155,154,1,0,0,0,
155,156,1,0,0,0,156,158,1,0,0,0,157,153,1,0,0,0,157,158,1,0,0,0,158,19,1,
0,0,0,159,160,5,23,0,0,160,161,5,11,0,0,161,166,3,22,11,0,162,163,5,15,0,
0,163,165,3,22,11,0,164,162,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,166,
167,1,0,0,0,167,169,1,0,0,0,168,166,1,0,0,0,169,170,5,12,0,0,170,175,1,0,
0,0,171,172,5,23,0,0,172,173,5,11,0,0,173,175,5,12,0,0,174,159,1,0,0,0,174,
171,1,0,0,0,175,21,1,0,0,0,176,179,3,2,1,0,177,179,3,26,13,0,178,176,1,0,
0,0,178,177,1,0,0,0,179,23,1,0,0,0,180,181,5,21,0,0,181,25,1,0,0,0,182,183,
5,4,0,0,183,184,3,2,1,0,184,27,1,0,0,0,185,186,7,3,0,0,186,29,1,0,0,0,16,
52,77,79,87,97,110,115,137,144,147,151,155,157,166,174,178];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class JsonFormulaParser extends antlr4.Parser {

    static grammarFileName = "JsonFormula.g4";
    static literalNames = [ null, "'.'", "'*'", "'/'", "'&'", "'~'", "'+'", 
                            "'-'", "'&&'", "'||'", "'!'", "'('", "')'", 
                            "'|'", "'['", "','", "']'", "'{'", "'}'", "':'", 
                            "'[?'", "'@'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, "COMPARATOR", 
                             "NAME", "QUOTED_NAME", "JSON_FRAGMENT", "STRING", 
                             "REAL_OR_EXPONENT_NUMBER", "SIGNED_INT", "WS" ];
    static ruleNames = [ "formula", "expression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "indexExpression", "chainedBracketSpecifier", "slice", 
                         "functionExpression", "functionArg", "currentNode", 
                         "expressionType", "identifier" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JsonFormulaParser.ruleNames;
        this.literalNames = JsonFormulaParser.literalNames;
        this.symbolicNames = JsonFormulaParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 18);
    		case 1:
    			return this.precpred(this._ctx, 17);
    		case 2:
    			return this.precpred(this._ctx, 16);
    		case 3:
    			return this.precpred(this._ctx, 15);
    		case 4:
    			return this.precpred(this._ctx, 14);
    		case 5:
    			return this.precpred(this._ctx, 4);
    		case 6:
    			return this.precpred(this._ctx, 21);
    		case 7:
    			return this.precpred(this._ctx, 20);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	formula() {
	    let localctx = new FormulaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JsonFormulaParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 30;
	        this.expression(0);
	        this.state = 31;
	        this.match(JsonFormulaParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, JsonFormulaParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 52;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new IndexedExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 34;
	            this.indexExpression();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 35;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 36;
	            this.match(JsonFormulaParser.T__9);
	            this.state = 37;
	            this.expression(12);
	            break;

	        case 4:
	            localctx = new UnaryMinusExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 38;
	            this.match(JsonFormulaParser.T__6);
	            this.state = 39;
	            this.expression(11);
	            break;

	        case 5:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 40;
	            this.match(JsonFormulaParser.T__10);
	            this.state = 41;
	            this.expression(0);
	            this.state = 42;
	            this.match(JsonFormulaParser.T__11);
	            break;

	        case 6:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 44;
	            this.wildcard();
	            break;

	        case 7:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 45;
	            this.multiSelectList();
	            break;

	        case 8:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 46;
	            this.multiSelectHash();
	            break;

	        case 9:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 47;
	            this.match(JsonFormulaParser.JSON_FRAGMENT);
	            break;

	        case 10:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 48;
	            this.functionExpression();
	            break;

	        case 11:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 49;
	            this.match(JsonFormulaParser.STRING);
	            break;

	        case 12:
	            localctx = new NumberLiteralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            _la = this._input.LA(1);
	            if(!(_la===27 || _la===28)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;

	        case 13:
	            localctx = new CurrentNodeExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 51;
	            this.currentNode();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 79;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 77;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MultDivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 54;
	                    if (!( this.precpred(this._ctx, 18))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
	                    }
	                    this.state = 55;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 60) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 56;
	                    this.expression(19);
	                    break;

	                case 2:
	                    localctx = new AddSubtractExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 57;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 58;
	                    _la = this._input.LA(1);
	                    if(!(_la===6 || _la===7)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 59;
	                    this.expression(18);
	                    break;

	                case 3:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 60;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 61;
	                    this.match(JsonFormulaParser.COMPARATOR);
	                    this.state = 62;
	                    this.expression(17);
	                    break;

	                case 4:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 63;
	                    if (!( this.precpred(this._ctx, 15))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
	                    }
	                    this.state = 64;
	                    this.match(JsonFormulaParser.T__7);
	                    this.state = 65;
	                    this.expression(16);
	                    break;

	                case 5:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 66;
	                    if (!( this.precpred(this._ctx, 14))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
	                    }
	                    this.state = 67;
	                    this.match(JsonFormulaParser.T__8);
	                    this.state = 68;
	                    this.expression(15);
	                    break;

	                case 6:
	                    localctx = new PipeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 69;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 70;
	                    this.match(JsonFormulaParser.T__12);
	                    this.state = 71;
	                    this.expression(5);
	                    break;

	                case 7:
	                    localctx = new ChainExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 72;
	                    if (!( this.precpred(this._ctx, 21))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
	                    }
	                    this.state = 73;
	                    this.match(JsonFormulaParser.T__0);
	                    this.state = 74;
	                    this.chainedExpression();
	                    break;

	                case 8:
	                    localctx = new BracketedExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JsonFormulaParser.RULE_expression);
	                    this.state = 75;
	                    if (!( this.precpred(this._ctx, 20))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
	                    }
	                    this.state = 76;
	                    this.chainedBracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 81;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	chainedExpression() {
	    let localctx = new ChainedExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, JsonFormulaParser.RULE_chainedExpression);
	    try {
	        this.state = 87;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 82;
	            this.identifier();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 83;
	            this.multiSelectList();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 84;
	            this.multiSelectHash();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 85;
	            this.functionExpression();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 86;
	            this.wildcard();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	wildcard() {
	    let localctx = new WildcardContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, JsonFormulaParser.RULE_wildcard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 89;
	        this.match(JsonFormulaParser.T__1);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	multiSelectList() {
	    let localctx = new MultiSelectListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, JsonFormulaParser.RULE_multiSelectList);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 91;
	        this.match(JsonFormulaParser.T__13);
	        this.state = 92;
	        this.expression(0);
	        this.state = 97;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 93;
	            this.match(JsonFormulaParser.T__14);
	            this.state = 94;
	            this.expression(0);
	            this.state = 99;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 100;
	        this.match(JsonFormulaParser.T__15);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	multiSelectHash() {
	    let localctx = new MultiSelectHashContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, JsonFormulaParser.RULE_multiSelectHash);
	    var _la = 0;
	    try {
	        this.state = 115;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new EmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 102;
	            this.match(JsonFormulaParser.T__16);
	            this.state = 103;
	            this.match(JsonFormulaParser.T__17);
	            break;

	        case 2:
	            localctx = new NonEmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 104;
	            this.match(JsonFormulaParser.T__16);
	            this.state = 105;
	            this.keyvalExpr();
	            this.state = 110;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 106;
	                this.match(JsonFormulaParser.T__14);
	                this.state = 107;
	                this.keyvalExpr();
	                this.state = 112;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 113;
	            this.match(JsonFormulaParser.T__17);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	keyvalExpr() {
	    let localctx = new KeyvalExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, JsonFormulaParser.RULE_keyvalExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 117;
	        this.identifier();
	        this.state = 118;
	        this.match(JsonFormulaParser.T__18);
	        this.state = 119;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	indexExpression() {
	    let localctx = new IndexExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, JsonFormulaParser.RULE_indexExpression);
	    try {
	        this.state = 137;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 121;
	            this.match(JsonFormulaParser.T__13);
	            this.state = 122;
	            this.match(JsonFormulaParser.SIGNED_INT);
	            this.state = 123;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 124;
	            this.match(JsonFormulaParser.T__13);
	            this.state = 125;
	            this.match(JsonFormulaParser.T__1);
	            this.state = 126;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 127;
	            this.match(JsonFormulaParser.T__13);
	            this.state = 128;
	            this.slice();
	            this.state = 129;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 131;
	            this.match(JsonFormulaParser.T__13);
	            this.state = 132;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 133;
	            this.match(JsonFormulaParser.T__19);
	            this.state = 134;
	            this.expression(0);
	            this.state = 135;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	chainedBracketSpecifier() {
	    let localctx = new ChainedBracketSpecifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, JsonFormulaParser.RULE_chainedBracketSpecifier);
	    try {
	        this.state = 144;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedBracketContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 139;
	            this.indexExpression();
	            break;

	        case 2:
	            localctx = new ChainedBracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 140;
	            this.match(JsonFormulaParser.T__13);
	            this.state = 141;
	            this.expression(0);
	            this.state = 142;
	            this.match(JsonFormulaParser.T__15);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	slice() {
	    let localctx = new SliceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, JsonFormulaParser.RULE_slice);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 147;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 531778692) !== 0)) {
	            this.state = 146;
	            localctx.start = this.expression(0);
	        }

	        this.state = 149;
	        this.match(JsonFormulaParser.T__18);
	        this.state = 151;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 531778692) !== 0)) {
	            this.state = 150;
	            localctx.stop = this.expression(0);
	        }

	        this.state = 157;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===19) {
	            this.state = 153;
	            this.match(JsonFormulaParser.T__18);
	            this.state = 155;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 531778692) !== 0)) {
	                this.state = 154;
	                localctx.step = this.expression(0);
	            }

	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functionExpression() {
	    let localctx = new FunctionExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, JsonFormulaParser.RULE_functionExpression);
	    var _la = 0;
	    try {
	        this.state = 174;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 159;
	            this.match(JsonFormulaParser.NAME);
	            this.state = 160;
	            this.match(JsonFormulaParser.T__10);
	            this.state = 161;
	            this.functionArg();
	            this.state = 166;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 162;
	                this.match(JsonFormulaParser.T__14);
	                this.state = 163;
	                this.functionArg();
	                this.state = 168;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 169;
	            this.match(JsonFormulaParser.T__11);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 171;
	            this.match(JsonFormulaParser.NAME);
	            this.state = 172;
	            this.match(JsonFormulaParser.T__10);
	            this.state = 173;
	            this.match(JsonFormulaParser.T__11);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functionArg() {
	    let localctx = new FunctionArgContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, JsonFormulaParser.RULE_functionArg);
	    try {
	        this.state = 178;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 2:
	        case 7:
	        case 10:
	        case 11:
	        case 14:
	        case 17:
	        case 20:
	        case 21:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 176;
	            this.expression(0);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 177;
	            this.expressionType();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	currentNode() {
	    let localctx = new CurrentNodeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, JsonFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 180;
	        this.match(JsonFormulaParser.T__20);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expressionType() {
	    let localctx = new ExpressionTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, JsonFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 182;
	        this.match(JsonFormulaParser.T__3);
	        this.state = 183;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	identifier() {
	    let localctx = new IdentifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, JsonFormulaParser.RULE_identifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 185;
	        _la = this._input.LA(1);
	        if(!(_la===23 || _la===24)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

JsonFormulaParser.EOF = antlr4.Token.EOF;
JsonFormulaParser.T__0 = 1;
JsonFormulaParser.T__1 = 2;
JsonFormulaParser.T__2 = 3;
JsonFormulaParser.T__3 = 4;
JsonFormulaParser.T__4 = 5;
JsonFormulaParser.T__5 = 6;
JsonFormulaParser.T__6 = 7;
JsonFormulaParser.T__7 = 8;
JsonFormulaParser.T__8 = 9;
JsonFormulaParser.T__9 = 10;
JsonFormulaParser.T__10 = 11;
JsonFormulaParser.T__11 = 12;
JsonFormulaParser.T__12 = 13;
JsonFormulaParser.T__13 = 14;
JsonFormulaParser.T__14 = 15;
JsonFormulaParser.T__15 = 16;
JsonFormulaParser.T__16 = 17;
JsonFormulaParser.T__17 = 18;
JsonFormulaParser.T__18 = 19;
JsonFormulaParser.T__19 = 20;
JsonFormulaParser.T__20 = 21;
JsonFormulaParser.COMPARATOR = 22;
JsonFormulaParser.NAME = 23;
JsonFormulaParser.QUOTED_NAME = 24;
JsonFormulaParser.JSON_FRAGMENT = 25;
JsonFormulaParser.STRING = 26;
JsonFormulaParser.REAL_OR_EXPONENT_NUMBER = 27;
JsonFormulaParser.SIGNED_INT = 28;
JsonFormulaParser.WS = 29;

JsonFormulaParser.RULE_formula = 0;
JsonFormulaParser.RULE_expression = 1;
JsonFormulaParser.RULE_chainedExpression = 2;
JsonFormulaParser.RULE_wildcard = 3;
JsonFormulaParser.RULE_multiSelectList = 4;
JsonFormulaParser.RULE_multiSelectHash = 5;
JsonFormulaParser.RULE_keyvalExpr = 6;
JsonFormulaParser.RULE_indexExpression = 7;
JsonFormulaParser.RULE_chainedBracketSpecifier = 8;
JsonFormulaParser.RULE_slice = 9;
JsonFormulaParser.RULE_functionExpression = 10;
JsonFormulaParser.RULE_functionArg = 11;
JsonFormulaParser.RULE_currentNode = 12;
JsonFormulaParser.RULE_expressionType = 13;
JsonFormulaParser.RULE_identifier = 14;

class FormulaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_formula;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	EOF() {
	    return this.getToken(JsonFormulaParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterFormula(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitFormula(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitFormula(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class PipeExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterPipeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitPipeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitPipeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.PipeExpressionContext = PipeExpressionContext;

class IdentifierExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterIdentifierExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitIdentifierExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitIdentifierExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.IdentifierExpressionContext = IdentifierExpressionContext;

class MultDivExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterMultDivExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitMultDivExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitMultDivExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.MultDivExpressionContext = MultDivExpressionContext;

class NotExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterNotExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitNotExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitNotExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.NotExpressionContext = NotExpressionContext;

class RawStringExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STRING() {
	    return this.getToken(JsonFormulaParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterRawStringExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitRawStringExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitRawStringExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.RawStringExpressionContext = RawStringExpressionContext;

class ComparisonExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	COMPARATOR() {
	    return this.getToken(JsonFormulaParser.COMPARATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterComparisonExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitComparisonExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitComparisonExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.ComparisonExpressionContext = ComparisonExpressionContext;

class ParenExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterParenExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitParenExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitParenExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.ParenExpressionContext = ParenExpressionContext;

class OrExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterOrExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitOrExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitOrExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.OrExpressionContext = OrExpressionContext;

class UnaryMinusExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterUnaryMinusExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitUnaryMinusExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitUnaryMinusExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.UnaryMinusExpressionContext = UnaryMinusExpressionContext;

class CurrentNodeExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	currentNode() {
	    return this.getTypedRuleContext(CurrentNodeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterCurrentNodeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitCurrentNodeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitCurrentNodeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.CurrentNodeExpressionContext = CurrentNodeExpressionContext;

class ChainExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	chainedExpression() {
	    return this.getTypedRuleContext(ChainedExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterChainExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitChainExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitChainExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.ChainExpressionContext = ChainExpressionContext;

class AndExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterAndExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitAndExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitAndExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.AndExpressionContext = AndExpressionContext;

class MultiSelectHashExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectHash() {
	    return this.getTypedRuleContext(MultiSelectHashContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterMultiSelectHashExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitMultiSelectHashExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitMultiSelectHashExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.MultiSelectHashExpressionContext = MultiSelectHashExpressionContext;

class WildcardExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	wildcard() {
	    return this.getTypedRuleContext(WildcardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterWildcardExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitWildcardExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitWildcardExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.WildcardExpressionContext = WildcardExpressionContext;

class FunctionCallExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functionExpression() {
	    return this.getTypedRuleContext(FunctionExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterFunctionCallExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitFunctionCallExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitFunctionCallExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.FunctionCallExpressionContext = FunctionCallExpressionContext;

class IndexedExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	indexExpression() {
	    return this.getTypedRuleContext(IndexExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterIndexedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitIndexedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitIndexedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.IndexedExpressionContext = IndexedExpressionContext;

class AddSubtractExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterAddSubtractExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitAddSubtractExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitAddSubtractExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.AddSubtractExpressionContext = AddSubtractExpressionContext;

class MultiSelectListExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectList() {
	    return this.getTypedRuleContext(MultiSelectListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterMultiSelectListExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitMultiSelectListExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitMultiSelectListExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.MultiSelectListExpressionContext = MultiSelectListExpressionContext;

class BracketedExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	chainedBracketSpecifier() {
	    return this.getTypedRuleContext(ChainedBracketSpecifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterBracketedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitBracketedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitBracketedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.BracketedExpressionContext = BracketedExpressionContext;

class LiteralExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	JSON_FRAGMENT() {
	    return this.getToken(JsonFormulaParser.JSON_FRAGMENT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterLiteralExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitLiteralExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitLiteralExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.LiteralExpressionContext = LiteralExpressionContext;

class NumberLiteralContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	REAL_OR_EXPONENT_NUMBER() {
	    return this.getToken(JsonFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
	};

	SIGNED_INT() {
	    return this.getToken(JsonFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterNumberLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitNumberLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitNumberLiteral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.NumberLiteralContext = NumberLiteralContext;

class ChainedExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_chainedExpression;
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	multiSelectList() {
	    return this.getTypedRuleContext(MultiSelectListContext,0);
	};

	multiSelectHash() {
	    return this.getTypedRuleContext(MultiSelectHashContext,0);
	};

	functionExpression() {
	    return this.getTypedRuleContext(FunctionExpressionContext,0);
	};

	wildcard() {
	    return this.getTypedRuleContext(WildcardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterChainedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitChainedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitChainedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class WildcardContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_wildcard;
    }


	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterWildcard(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitWildcard(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitWildcard(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class MultiSelectListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_multiSelectList;
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterMultiSelectList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitMultiSelectList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitMultiSelectList(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class MultiSelectHashContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_multiSelectHash;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class NonEmptyHashContext extends MultiSelectHashContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	keyvalExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(KeyvalExprContext);
	    } else {
	        return this.getTypedRuleContext(KeyvalExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterNonEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitNonEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitNonEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.NonEmptyHashContext = NonEmptyHashContext;

class EmptyHashContext extends MultiSelectHashContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.EmptyHashContext = EmptyHashContext;

class KeyvalExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_keyvalExpr;
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterKeyvalExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitKeyvalExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitKeyvalExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IndexExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_indexExpression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class SelectContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterSelect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitSelect(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitSelect(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.SelectContext = SelectContext;

class BracketFlattenContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterBracketFlatten(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitBracketFlatten(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitBracketFlatten(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.BracketFlattenContext = BracketFlattenContext;

class BracketSliceContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	slice() {
	    return this.getTypedRuleContext(SliceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterBracketSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitBracketSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitBracketSlice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.BracketSliceContext = BracketSliceContext;

class BracketIndexContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	SIGNED_INT() {
	    return this.getToken(JsonFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.BracketIndexContext = BracketIndexContext;

class BracketStarContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterBracketStar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitBracketStar(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitBracketStar(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.BracketStarContext = BracketStarContext;

class ChainedBracketSpecifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_chainedBracketSpecifier;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ChainedBracketContext extends ChainedBracketSpecifierContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	indexExpression() {
	    return this.getTypedRuleContext(IndexExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterChainedBracket(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitChainedBracket(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitChainedBracket(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.ChainedBracketContext = ChainedBracketContext;

class ChainedBracketIndexContext extends ChainedBracketSpecifierContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterChainedBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitChainedBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitChainedBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JsonFormulaParser.ChainedBracketIndexContext = ChainedBracketIndexContext;

class SliceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_slice;
        this.start = null;
        this.stop = null;
        this.step = null;
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitSlice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctionExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_functionExpression;
    }

	NAME() {
	    return this.getToken(JsonFormulaParser.NAME, 0);
	};

	functionArg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FunctionArgContext);
	    } else {
	        return this.getTypedRuleContext(FunctionArgContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterFunctionExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitFunctionExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitFunctionExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctionArgContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_functionArg;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	expressionType() {
	    return this.getTypedRuleContext(ExpressionTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterFunctionArg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitFunctionArg(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitFunctionArg(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CurrentNodeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_currentNode;
    }


	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterCurrentNode(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitCurrentNode(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitCurrentNode(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpressionTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_expressionType;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterExpressionType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitExpressionType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitExpressionType(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IdentifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JsonFormulaParser.RULE_identifier;
    }

	NAME() {
	    return this.getToken(JsonFormulaParser.NAME, 0);
	};

	QUOTED_NAME() {
	    return this.getToken(JsonFormulaParser.QUOTED_NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.enterIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JsonFormulaListener ) {
	        listener.exitIdentifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JsonFormulaVisitor ) {
	        return visitor.visitIdentifier(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




JsonFormulaParser.FormulaContext = FormulaContext; 
JsonFormulaParser.ExpressionContext = ExpressionContext; 
JsonFormulaParser.ChainedExpressionContext = ChainedExpressionContext; 
JsonFormulaParser.WildcardContext = WildcardContext; 
JsonFormulaParser.MultiSelectListContext = MultiSelectListContext; 
JsonFormulaParser.MultiSelectHashContext = MultiSelectHashContext; 
JsonFormulaParser.KeyvalExprContext = KeyvalExprContext; 
JsonFormulaParser.IndexExpressionContext = IndexExpressionContext; 
JsonFormulaParser.ChainedBracketSpecifierContext = ChainedBracketSpecifierContext; 
JsonFormulaParser.SliceContext = SliceContext; 
JsonFormulaParser.FunctionExpressionContext = FunctionExpressionContext; 
JsonFormulaParser.FunctionArgContext = FunctionArgContext; 
JsonFormulaParser.CurrentNodeContext = CurrentNodeContext; 
JsonFormulaParser.ExpressionTypeContext = ExpressionTypeContext; 
JsonFormulaParser.IdentifierContext = IdentifierContext; 

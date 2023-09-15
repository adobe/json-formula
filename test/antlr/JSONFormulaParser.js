// Generated from antlr/JSONFormula.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONFormulaListener from './JSONFormulaListener.js';
import JSONFormulaVisitor from './JSONFormulaVisitor.js';

const serializedATN = [4,1,31,246,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,
0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,3,1,63,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,91,8,1,10,1,
12,1,94,9,1,1,2,1,2,1,2,1,2,1,2,3,2,101,8,2,1,3,1,3,1,4,1,4,1,4,1,4,5,4,
109,8,4,10,4,12,4,112,9,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,5,5,122,8,5,10,
5,12,5,125,9,5,1,5,1,5,3,5,129,8,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,
7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,151,8,7,1,8,1,8,1,8,1,8,1,
8,3,8,158,8,8,1,9,3,9,161,8,9,1,9,1,9,3,9,165,8,9,1,9,1,9,3,9,169,8,9,3,
9,171,8,9,1,10,1,10,1,10,1,10,1,10,5,10,178,8,10,10,10,12,10,181,9,10,1,
10,1,10,1,10,1,10,1,10,3,10,188,8,10,1,11,1,11,3,11,192,8,11,1,12,1,12,1,
13,1,13,1,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,5,16,209,
8,16,10,16,12,16,212,9,16,1,16,1,16,1,16,1,16,3,16,218,8,16,1,17,1,17,1,
17,1,17,1,18,1,18,1,18,1,18,5,18,228,8,18,10,18,12,18,231,9,18,1,18,1,18,
1,18,1,18,3,18,237,8,18,1,19,1,19,1,19,1,19,1,19,3,19,244,8,19,1,19,0,1,
2,20,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,0,5,1,0,27,28,
1,0,29,30,1,0,3,6,1,0,7,8,1,0,25,26,273,0,40,1,0,0,0,2,62,1,0,0,0,4,100,
1,0,0,0,6,102,1,0,0,0,8,104,1,0,0,0,10,128,1,0,0,0,12,130,1,0,0,0,14,150,
1,0,0,0,16,157,1,0,0,0,18,160,1,0,0,0,20,187,1,0,0,0,22,191,1,0,0,0,24,193,
1,0,0,0,26,195,1,0,0,0,28,198,1,0,0,0,30,202,1,0,0,0,32,217,1,0,0,0,34,219,
1,0,0,0,36,236,1,0,0,0,38,243,1,0,0,0,40,41,3,2,1,0,41,42,5,0,0,1,42,1,1,
0,0,0,43,44,6,1,-1,0,44,63,3,14,7,0,45,63,3,30,15,0,46,47,5,11,0,0,47,63,
3,2,1,12,48,49,5,8,0,0,49,63,3,2,1,11,50,51,5,12,0,0,51,52,3,2,1,0,52,53,
5,13,0,0,53,63,1,0,0,0,54,63,3,6,3,0,55,63,3,8,4,0,56,63,3,10,5,0,57,63,
3,28,14,0,58,63,3,20,10,0,59,63,7,0,0,0,60,63,7,1,0,0,61,63,3,24,12,0,62,
43,1,0,0,0,62,45,1,0,0,0,62,46,1,0,0,0,62,48,1,0,0,0,62,50,1,0,0,0,62,54,
1,0,0,0,62,55,1,0,0,0,62,56,1,0,0,0,62,57,1,0,0,0,62,58,1,0,0,0,62,59,1,
0,0,0,62,60,1,0,0,0,62,61,1,0,0,0,63,92,1,0,0,0,64,65,10,19,0,0,65,66,5,
2,0,0,66,91,3,2,1,20,67,68,10,18,0,0,68,69,7,2,0,0,69,91,3,2,1,19,70,71,
10,17,0,0,71,72,7,3,0,0,72,91,3,2,1,18,73,74,10,16,0,0,74,75,5,24,0,0,75,
91,3,2,1,17,76,77,10,15,0,0,77,78,5,9,0,0,78,91,3,2,1,16,79,80,10,14,0,0,
80,81,5,10,0,0,81,91,3,2,1,15,82,83,10,4,0,0,83,84,5,14,0,0,84,91,3,2,1,
5,85,86,10,22,0,0,86,87,5,1,0,0,87,91,3,4,2,0,88,89,10,21,0,0,89,91,3,16,
8,0,90,64,1,0,0,0,90,67,1,0,0,0,90,70,1,0,0,0,90,73,1,0,0,0,90,76,1,0,0,
0,90,79,1,0,0,0,90,82,1,0,0,0,90,85,1,0,0,0,90,88,1,0,0,0,91,94,1,0,0,0,
92,90,1,0,0,0,92,93,1,0,0,0,93,3,1,0,0,0,94,92,1,0,0,0,95,101,3,30,15,0,
96,101,3,8,4,0,97,101,3,10,5,0,98,101,3,20,10,0,99,101,3,6,3,0,100,95,1,
0,0,0,100,96,1,0,0,0,100,97,1,0,0,0,100,98,1,0,0,0,100,99,1,0,0,0,101,5,
1,0,0,0,102,103,5,3,0,0,103,7,1,0,0,0,104,105,5,15,0,0,105,110,3,2,1,0,106,
107,5,16,0,0,107,109,3,2,1,0,108,106,1,0,0,0,109,112,1,0,0,0,110,108,1,0,
0,0,110,111,1,0,0,0,111,113,1,0,0,0,112,110,1,0,0,0,113,114,5,17,0,0,114,
9,1,0,0,0,115,116,5,18,0,0,116,129,5,19,0,0,117,118,5,18,0,0,118,123,3,12,
6,0,119,120,5,16,0,0,120,122,3,12,6,0,121,119,1,0,0,0,122,125,1,0,0,0,123,
121,1,0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,123,1,0,0,0,126,127,5,19,
0,0,127,129,1,0,0,0,128,115,1,0,0,0,128,117,1,0,0,0,129,11,1,0,0,0,130,131,
3,30,15,0,131,132,5,20,0,0,132,133,3,2,1,0,133,13,1,0,0,0,134,135,5,15,0,
0,135,136,5,30,0,0,136,151,5,17,0,0,137,138,5,15,0,0,138,139,5,3,0,0,139,
151,5,17,0,0,140,141,5,15,0,0,141,142,3,18,9,0,142,143,5,17,0,0,143,151,
1,0,0,0,144,145,5,15,0,0,145,151,5,17,0,0,146,147,5,21,0,0,147,148,3,2,1,
0,148,149,5,17,0,0,149,151,1,0,0,0,150,134,1,0,0,0,150,137,1,0,0,0,150,140,
1,0,0,0,150,144,1,0,0,0,150,146,1,0,0,0,151,15,1,0,0,0,152,158,3,14,7,0,
153,154,5,15,0,0,154,155,3,2,1,0,155,156,5,17,0,0,156,158,1,0,0,0,157,152,
1,0,0,0,157,153,1,0,0,0,158,17,1,0,0,0,159,161,3,2,1,0,160,159,1,0,0,0,160,
161,1,0,0,0,161,162,1,0,0,0,162,164,5,20,0,0,163,165,3,2,1,0,164,163,1,0,
0,0,164,165,1,0,0,0,165,170,1,0,0,0,166,168,5,20,0,0,167,169,3,2,1,0,168,
167,1,0,0,0,168,169,1,0,0,0,169,171,1,0,0,0,170,166,1,0,0,0,170,171,1,0,
0,0,171,19,1,0,0,0,172,173,5,25,0,0,173,174,5,12,0,0,174,179,3,22,11,0,175,
176,5,16,0,0,176,178,3,22,11,0,177,175,1,0,0,0,178,181,1,0,0,0,179,177,1,
0,0,0,179,180,1,0,0,0,180,182,1,0,0,0,181,179,1,0,0,0,182,183,5,13,0,0,183,
188,1,0,0,0,184,185,5,25,0,0,185,186,5,12,0,0,186,188,5,13,0,0,187,172,1,
0,0,0,187,184,1,0,0,0,188,21,1,0,0,0,189,192,3,2,1,0,190,192,3,26,13,0,191,
189,1,0,0,0,191,190,1,0,0,0,192,23,1,0,0,0,193,194,5,22,0,0,194,25,1,0,0,
0,195,196,5,5,0,0,196,197,3,2,1,0,197,27,1,0,0,0,198,199,5,23,0,0,199,200,
3,38,19,0,200,201,5,23,0,0,201,29,1,0,0,0,202,203,7,4,0,0,203,31,1,0,0,0,
204,205,5,18,0,0,205,210,3,34,17,0,206,207,5,16,0,0,207,209,3,34,17,0,208,
206,1,0,0,0,209,212,1,0,0,0,210,208,1,0,0,0,210,211,1,0,0,0,211,213,1,0,
0,0,212,210,1,0,0,0,213,214,5,19,0,0,214,218,1,0,0,0,215,216,5,18,0,0,216,
218,5,19,0,0,217,204,1,0,0,0,217,215,1,0,0,0,218,33,1,0,0,0,219,220,5,27,
0,0,220,221,5,20,0,0,221,222,3,38,19,0,222,35,1,0,0,0,223,224,5,15,0,0,224,
229,3,38,19,0,225,226,5,16,0,0,226,228,3,38,19,0,227,225,1,0,0,0,228,231,
1,0,0,0,229,227,1,0,0,0,229,230,1,0,0,0,230,232,1,0,0,0,231,229,1,0,0,0,
232,233,5,17,0,0,233,237,1,0,0,0,234,235,5,15,0,0,235,237,5,17,0,0,236,223,
1,0,0,0,236,234,1,0,0,0,237,37,1,0,0,0,238,244,5,27,0,0,239,244,7,1,0,0,
240,244,3,32,16,0,241,244,3,36,18,0,242,244,5,25,0,0,243,238,1,0,0,0,243,
239,1,0,0,0,243,240,1,0,0,0,243,241,1,0,0,0,243,242,1,0,0,0,244,39,1,0,0,
0,21,62,90,92,100,110,123,128,150,157,160,164,168,170,179,187,191,210,217,
229,236,243];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class JSONFormulaParser extends antlr4.Parser {

    static grammarFileName = "JSONFormula.g4";
    static literalNames = [ null, "'.'", "'^'", "'*'", "'/'", "'&'", "'~'", 
                            "'+'", "'-'", "'&&'", "'||'", "'!'", "'('", 
                            "')'", "'|'", "'['", "','", "']'", "'{'", "'}'", 
                            "':'", "'[?'", "'@'", "'`'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             "COMPARATOR", "NAME", "QUOTED_NAME", "STRING", 
                             "RAW_STRING", "REAL_OR_EXPONENT_NUMBER", "SIGNED_INT", 
                             "WS" ];
    static ruleNames = [ "formula", "expression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "indexExpression", "chainedBracketSpecifier", "slice", 
                         "functionExpression", "functionArg", "currentNode", 
                         "expressionType", "literal", "identifier", "jsonObject", 
                         "jsonObjectPair", "jsonArray", "jsonValue" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JSONFormulaParser.ruleNames;
        this.literalNames = JSONFormulaParser.literalNames;
        this.symbolicNames = JSONFormulaParser.symbolicNames;
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
    			return this.precpred(this._ctx, 19);
    		case 1:
    			return this.precpred(this._ctx, 18);
    		case 2:
    			return this.precpred(this._ctx, 17);
    		case 3:
    			return this.precpred(this._ctx, 16);
    		case 4:
    			return this.precpred(this._ctx, 15);
    		case 5:
    			return this.precpred(this._ctx, 14);
    		case 6:
    			return this.precpred(this._ctx, 4);
    		case 7:
    			return this.precpred(this._ctx, 22);
    		case 8:
    			return this.precpred(this._ctx, 21);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	formula() {
	    let localctx = new FormulaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JSONFormulaParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 40;
	        this.expression(0);
	        this.state = 41;
	        this.match(JSONFormulaParser.EOF);
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
	    this.enterRecursionRule(localctx, 2, JSONFormulaParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 44;
	            this.indexExpression();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 45;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 46;
	            this.match(JSONFormulaParser.T__10);
	            this.state = 47;
	            this.expression(12);
	            break;

	        case 4:
	            localctx = new UnaryMinusExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 48;
	            this.match(JSONFormulaParser.T__7);
	            this.state = 49;
	            this.expression(11);
	            break;

	        case 5:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 51;
	            this.expression(0);
	            this.state = 52;
	            this.match(JSONFormulaParser.T__12);
	            break;

	        case 6:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 54;
	            this.wildcard();
	            break;

	        case 7:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 55;
	            this.multiSelectList();
	            break;

	        case 8:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 56;
	            this.multiSelectHash();
	            break;

	        case 9:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 57;
	            this.literal();
	            break;

	        case 10:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 58;
	            this.functionExpression();
	            break;

	        case 11:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 59;
	            _la = this._input.LA(1);
	            if(!(_la===27 || _la===28)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;

	        case 12:
	            localctx = new NumberLiteralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 60;
	            _la = this._input.LA(1);
	            if(!(_la===29 || _la===30)) {
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
	            this.state = 61;
	            this.currentNode();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 92;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 90;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new PowerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 64;
	                    if (!( this.precpred(this._ctx, 19))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
	                    }

	                    this.state = 65;
	                    this.match(JSONFormulaParser.T__1);
	                    this.state = 66;
	                    this.expression(20);
	                    break;

	                case 2:
	                    localctx = new MultDivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 67;
	                    if (!( this.precpred(this._ctx, 18))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
	                    }
	                    this.state = 68;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 120) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 69;
	                    this.expression(19);
	                    break;

	                case 3:
	                    localctx = new AddSubtractExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 70;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 71;
	                    _la = this._input.LA(1);
	                    if(!(_la===7 || _la===8)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 72;
	                    this.expression(18);
	                    break;

	                case 4:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 73;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 74;
	                    this.match(JSONFormulaParser.COMPARATOR);
	                    this.state = 75;
	                    this.expression(17);
	                    break;

	                case 5:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 76;
	                    if (!( this.precpred(this._ctx, 15))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
	                    }
	                    this.state = 77;
	                    this.match(JSONFormulaParser.T__8);
	                    this.state = 78;
	                    this.expression(16);
	                    break;

	                case 6:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 79;
	                    if (!( this.precpred(this._ctx, 14))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
	                    }
	                    this.state = 80;
	                    this.match(JSONFormulaParser.T__9);
	                    this.state = 81;
	                    this.expression(15);
	                    break;

	                case 7:
	                    localctx = new PipeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 82;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 83;
	                    this.match(JSONFormulaParser.T__13);
	                    this.state = 84;
	                    this.expression(5);
	                    break;

	                case 8:
	                    localctx = new ChainExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 85;
	                    if (!( this.precpred(this._ctx, 22))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
	                    }
	                    this.state = 86;
	                    this.match(JSONFormulaParser.T__0);
	                    this.state = 87;
	                    this.chainedExpression();
	                    break;

	                case 9:
	                    localctx = new BracketedExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 88;
	                    if (!( this.precpred(this._ctx, 21))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
	                    }
	                    this.state = 89;
	                    this.chainedBracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 94;
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
	    this.enterRule(localctx, 4, JSONFormulaParser.RULE_chainedExpression);
	    try {
	        this.state = 100;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 95;
	            this.identifier();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 96;
	            this.multiSelectList();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 97;
	            this.multiSelectHash();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 98;
	            this.functionExpression();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 99;
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
	    this.enterRule(localctx, 6, JSONFormulaParser.RULE_wildcard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 102;
	        this.match(JSONFormulaParser.T__2);
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
	    this.enterRule(localctx, 8, JSONFormulaParser.RULE_multiSelectList);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 104;
	        this.match(JSONFormulaParser.T__14);
	        this.state = 105;
	        this.expression(0);
	        this.state = 110;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===16) {
	            this.state = 106;
	            this.match(JSONFormulaParser.T__15);
	            this.state = 107;
	            this.expression(0);
	            this.state = 112;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 113;
	        this.match(JSONFormulaParser.T__16);
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
	    this.enterRule(localctx, 10, JSONFormulaParser.RULE_multiSelectHash);
	    var _la = 0;
	    try {
	        this.state = 128;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new EmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 115;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 116;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            localctx = new NonEmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 117;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 118;
	            this.keyvalExpr();
	            this.state = 123;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===16) {
	                this.state = 119;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 120;
	                this.keyvalExpr();
	                this.state = 125;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 126;
	            this.match(JSONFormulaParser.T__18);
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
	    this.enterRule(localctx, 12, JSONFormulaParser.RULE_keyvalExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 130;
	        this.identifier();
	        this.state = 131;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 132;
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
	    this.enterRule(localctx, 14, JSONFormulaParser.RULE_indexExpression);
	    try {
	        this.state = 150;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 134;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 135;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            this.state = 136;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 137;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 138;
	            this.match(JSONFormulaParser.T__2);
	            this.state = 139;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 140;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 141;
	            this.slice();
	            this.state = 142;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 144;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 145;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 146;
	            this.match(JSONFormulaParser.T__20);
	            this.state = 147;
	            this.expression(0);
	            this.state = 148;
	            this.match(JSONFormulaParser.T__16);
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
	    this.enterRule(localctx, 16, JSONFormulaParser.RULE_chainedBracketSpecifier);
	    try {
	        this.state = 157;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedBracketContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 152;
	            this.indexExpression();
	            break;

	        case 2:
	            localctx = new ChainedBracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 153;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 154;
	            this.expression(0);
	            this.state = 155;
	            this.match(JSONFormulaParser.T__16);
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
	    this.enterRule(localctx, 18, JSONFormulaParser.RULE_slice);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 160;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 2128910600) !== 0)) {
	            this.state = 159;
	            localctx.start = this.expression(0);
	        }

	        this.state = 162;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 164;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 2128910600) !== 0)) {
	            this.state = 163;
	            localctx.stop = this.expression(0);
	        }

	        this.state = 170;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===20) {
	            this.state = 166;
	            this.match(JSONFormulaParser.T__19);
	            this.state = 168;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 2128910600) !== 0)) {
	                this.state = 167;
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
	    this.enterRule(localctx, 20, JSONFormulaParser.RULE_functionExpression);
	    var _la = 0;
	    try {
	        this.state = 187;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 172;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 173;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 174;
	            this.functionArg();
	            this.state = 179;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===16) {
	                this.state = 175;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 176;
	                this.functionArg();
	                this.state = 181;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 182;
	            this.match(JSONFormulaParser.T__12);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 184;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 185;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 186;
	            this.match(JSONFormulaParser.T__12);
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
	    this.enterRule(localctx, 22, JSONFormulaParser.RULE_functionArg);
	    try {
	        this.state = 191;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	        case 8:
	        case 11:
	        case 12:
	        case 15:
	        case 18:
	        case 21:
	        case 22:
	        case 23:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 189;
	            this.expression(0);
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 190;
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
	    this.enterRule(localctx, 24, JSONFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 193;
	        this.match(JSONFormulaParser.T__21);
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
	    this.enterRule(localctx, 26, JSONFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 195;
	        this.match(JSONFormulaParser.T__4);
	        this.state = 196;
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



	literal() {
	    let localctx = new LiteralContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, JSONFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 198;
	        this.match(JSONFormulaParser.T__22);
	        this.state = 199;
	        this.jsonValue();
	        this.state = 200;
	        this.match(JSONFormulaParser.T__22);
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
	    this.enterRule(localctx, 30, JSONFormulaParser.RULE_identifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 202;
	        _la = this._input.LA(1);
	        if(!(_la===25 || _la===26)) {
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



	jsonObject() {
	    let localctx = new JsonObjectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, JSONFormulaParser.RULE_jsonObject);
	    var _la = 0;
	    try {
	        this.state = 217;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 204;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 205;
	            this.jsonObjectPair();
	            this.state = 210;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===16) {
	                this.state = 206;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 207;
	                this.jsonObjectPair();
	                this.state = 212;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 213;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 215;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 216;
	            this.match(JSONFormulaParser.T__18);
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



	jsonObjectPair() {
	    let localctx = new JsonObjectPairContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, JSONFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 219;
	        this.match(JSONFormulaParser.STRING);
	        this.state = 220;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 221;
	        this.jsonValue();
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



	jsonArray() {
	    let localctx = new JsonArrayContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, JSONFormulaParser.RULE_jsonArray);
	    var _la = 0;
	    try {
	        this.state = 236;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 223;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 224;
	            this.jsonValue();
	            this.state = 229;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===16) {
	                this.state = 225;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 226;
	                this.jsonValue();
	                this.state = 231;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 232;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 234;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 235;
	            this.match(JSONFormulaParser.T__16);
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



	jsonValue() {
	    let localctx = new JsonValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, JSONFormulaParser.RULE_jsonValue);
	    var _la = 0;
	    try {
	        this.state = 243;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 27:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 238;
	            this.match(JSONFormulaParser.STRING);
	            break;
	        case 29:
	        case 30:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 239;
	            _la = this._input.LA(1);
	            if(!(_la===29 || _la===30)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case 18:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 240;
	            this.jsonObject();
	            break;
	        case 15:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 241;
	            this.jsonArray();
	            break;
	        case 25:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 242;
	            this.match(JSONFormulaParser.NAME);
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


}

JSONFormulaParser.EOF = antlr4.Token.EOF;
JSONFormulaParser.T__0 = 1;
JSONFormulaParser.T__1 = 2;
JSONFormulaParser.T__2 = 3;
JSONFormulaParser.T__3 = 4;
JSONFormulaParser.T__4 = 5;
JSONFormulaParser.T__5 = 6;
JSONFormulaParser.T__6 = 7;
JSONFormulaParser.T__7 = 8;
JSONFormulaParser.T__8 = 9;
JSONFormulaParser.T__9 = 10;
JSONFormulaParser.T__10 = 11;
JSONFormulaParser.T__11 = 12;
JSONFormulaParser.T__12 = 13;
JSONFormulaParser.T__13 = 14;
JSONFormulaParser.T__14 = 15;
JSONFormulaParser.T__15 = 16;
JSONFormulaParser.T__16 = 17;
JSONFormulaParser.T__17 = 18;
JSONFormulaParser.T__18 = 19;
JSONFormulaParser.T__19 = 20;
JSONFormulaParser.T__20 = 21;
JSONFormulaParser.T__21 = 22;
JSONFormulaParser.T__22 = 23;
JSONFormulaParser.COMPARATOR = 24;
JSONFormulaParser.NAME = 25;
JSONFormulaParser.QUOTED_NAME = 26;
JSONFormulaParser.STRING = 27;
JSONFormulaParser.RAW_STRING = 28;
JSONFormulaParser.REAL_OR_EXPONENT_NUMBER = 29;
JSONFormulaParser.SIGNED_INT = 30;
JSONFormulaParser.WS = 31;

JSONFormulaParser.RULE_formula = 0;
JSONFormulaParser.RULE_expression = 1;
JSONFormulaParser.RULE_chainedExpression = 2;
JSONFormulaParser.RULE_wildcard = 3;
JSONFormulaParser.RULE_multiSelectList = 4;
JSONFormulaParser.RULE_multiSelectHash = 5;
JSONFormulaParser.RULE_keyvalExpr = 6;
JSONFormulaParser.RULE_indexExpression = 7;
JSONFormulaParser.RULE_chainedBracketSpecifier = 8;
JSONFormulaParser.RULE_slice = 9;
JSONFormulaParser.RULE_functionExpression = 10;
JSONFormulaParser.RULE_functionArg = 11;
JSONFormulaParser.RULE_currentNode = 12;
JSONFormulaParser.RULE_expressionType = 13;
JSONFormulaParser.RULE_literal = 14;
JSONFormulaParser.RULE_identifier = 15;
JSONFormulaParser.RULE_jsonObject = 16;
JSONFormulaParser.RULE_jsonObjectPair = 17;
JSONFormulaParser.RULE_jsonArray = 18;
JSONFormulaParser.RULE_jsonValue = 19;

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
        this.ruleIndex = JSONFormulaParser.RULE_formula;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	EOF() {
	    return this.getToken(JSONFormulaParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFormula(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFormula(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_expression;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPipeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPipeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitPipeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.PipeExpressionContext = PipeExpressionContext;

class IdentifierExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterIdentifierExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitIdentifierExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitIdentifierExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.IdentifierExpressionContext = IdentifierExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterMultDivExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitMultDivExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitMultDivExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.MultDivExpressionContext = MultDivExpressionContext;

class NotExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterNotExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitNotExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitNotExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.NotExpressionContext = NotExpressionContext;

class RawStringExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STRING() {
	    return this.getToken(JSONFormulaParser.STRING, 0);
	};

	RAW_STRING() {
	    return this.getToken(JSONFormulaParser.RAW_STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterRawStringExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitRawStringExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitRawStringExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.RawStringExpressionContext = RawStringExpressionContext;

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
	    return this.getToken(JSONFormulaParser.COMPARATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterComparisonExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitComparisonExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitComparisonExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ComparisonExpressionContext = ComparisonExpressionContext;

class ParenExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterParenExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitParenExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitParenExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ParenExpressionContext = ParenExpressionContext;

class BracketExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	indexExpression() {
	    return this.getTypedRuleContext(IndexExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketExpressionContext = BracketExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterOrExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitOrExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitOrExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.OrExpressionContext = OrExpressionContext;

class UnaryMinusExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterUnaryMinusExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitUnaryMinusExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitUnaryMinusExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.UnaryMinusExpressionContext = UnaryMinusExpressionContext;

class CurrentNodeExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	currentNode() {
	    return this.getTypedRuleContext(CurrentNodeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterCurrentNodeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitCurrentNodeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitCurrentNodeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.CurrentNodeExpressionContext = CurrentNodeExpressionContext;

class PowerExpressionContext extends ExpressionContext {

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPowerExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPowerExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitPowerExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.PowerExpressionContext = PowerExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainExpressionContext = ChainExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterAndExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitAndExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitAndExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.AndExpressionContext = AndExpressionContext;

class MultiSelectHashExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectHash() {
	    return this.getTypedRuleContext(MultiSelectHashContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterMultiSelectHashExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitMultiSelectHashExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitMultiSelectHashExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.MultiSelectHashExpressionContext = MultiSelectHashExpressionContext;

class WildcardExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	wildcard() {
	    return this.getTypedRuleContext(WildcardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterWildcardExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitWildcardExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitWildcardExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.WildcardExpressionContext = WildcardExpressionContext;

class FunctionCallExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functionExpression() {
	    return this.getTypedRuleContext(FunctionExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFunctionCallExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFunctionCallExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitFunctionCallExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.FunctionCallExpressionContext = FunctionCallExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterAddSubtractExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitAddSubtractExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitAddSubtractExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.AddSubtractExpressionContext = AddSubtractExpressionContext;

class MultiSelectListExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectList() {
	    return this.getTypedRuleContext(MultiSelectListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterMultiSelectListExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitMultiSelectListExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitMultiSelectListExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.MultiSelectListExpressionContext = MultiSelectListExpressionContext;

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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketedExpressionContext = BracketedExpressionContext;

class LiteralExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterLiteralExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitLiteralExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitLiteralExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.LiteralExpressionContext = LiteralExpressionContext;

class NumberLiteralContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	REAL_OR_EXPONENT_NUMBER() {
	    return this.getToken(JSONFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
	};

	SIGNED_INT() {
	    return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterNumberLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitNumberLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitNumberLiteral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.NumberLiteralContext = NumberLiteralContext;

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
        this.ruleIndex = JSONFormulaParser.RULE_chainedExpression;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_wildcard;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterWildcard(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitWildcard(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_multiSelectList;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterMultiSelectList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitMultiSelectList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_multiSelectHash;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterNonEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitNonEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitNonEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.NonEmptyHashContext = NonEmptyHashContext;

class EmptyHashContext extends MultiSelectHashContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.EmptyHashContext = EmptyHashContext;

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
        this.ruleIndex = JSONFormulaParser.RULE_keyvalExpr;
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterKeyvalExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitKeyvalExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_indexExpression;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterSelect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitSelect(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitSelect(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.SelectContext = SelectContext;

class BracketFlattenContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketFlatten(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketFlatten(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketFlatten(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketFlattenContext = BracketFlattenContext;

class BracketSliceContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	slice() {
	    return this.getTypedRuleContext(SliceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketSlice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketSliceContext = BracketSliceContext;

class BracketIndexContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	SIGNED_INT() {
	    return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketIndexContext = BracketIndexContext;

class BracketStarContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBracketStar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBracketStar(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBracketStar(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BracketStarContext = BracketStarContext;

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
        this.ruleIndex = JSONFormulaParser.RULE_chainedBracketSpecifier;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedBracket(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedBracket(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedBracket(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedBracketContext = ChainedBracketContext;

class ChainedBracketIndexContext extends ChainedBracketSpecifierContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedBracketIndexContext = ChainedBracketIndexContext;

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
        this.ruleIndex = JSONFormulaParser.RULE_slice;
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_functionExpression;
    }

	NAME() {
	    return this.getToken(JSONFormulaParser.NAME, 0);
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
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFunctionExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFunctionExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_functionArg;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	expressionType() {
	    return this.getTypedRuleContext(ExpressionTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFunctionArg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFunctionArg(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_currentNode;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterCurrentNode(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitCurrentNode(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
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
        this.ruleIndex = JSONFormulaParser.RULE_expressionType;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterExpressionType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitExpressionType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitExpressionType(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LiteralContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_literal;
    }

	jsonValue() {
	    return this.getTypedRuleContext(JsonValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitLiteral(this);
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
        this.ruleIndex = JSONFormulaParser.RULE_identifier;
    }

	NAME() {
	    return this.getToken(JSONFormulaParser.NAME, 0);
	};

	QUOTED_NAME() {
	    return this.getToken(JSONFormulaParser.QUOTED_NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitIdentifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitIdentifier(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class JsonObjectContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_jsonObject;
    }

	jsonObjectPair = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JsonObjectPairContext);
	    } else {
	        return this.getTypedRuleContext(JsonObjectPairContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonObject(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonObject(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonObject(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class JsonObjectPairContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_jsonObjectPair;
    }

	STRING() {
	    return this.getToken(JSONFormulaParser.STRING, 0);
	};

	jsonValue() {
	    return this.getTypedRuleContext(JsonValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonObjectPair(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonObjectPair(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonObjectPair(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class JsonArrayContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_jsonArray;
    }

	jsonValue = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JsonValueContext);
	    } else {
	        return this.getTypedRuleContext(JsonValueContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonArray(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonArray(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonArray(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class JsonValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_jsonValue;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class JsonArrayValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jsonArray() {
	    return this.getTypedRuleContext(JsonArrayContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonArrayValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonArrayValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonArrayValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JsonArrayValueContext = JsonArrayValueContext;

class JsonStringValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STRING() {
	    return this.getToken(JSONFormulaParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonStringValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonStringValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonStringValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JsonStringValueContext = JsonStringValueContext;

class JsonObjectValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jsonObject() {
	    return this.getTypedRuleContext(JsonObjectContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonObjectValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonObjectValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonObjectValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JsonObjectValueContext = JsonObjectValueContext;

class JsonConstantValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NAME() {
	    return this.getToken(JSONFormulaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonConstantValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonConstantValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonConstantValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JsonConstantValueContext = JsonConstantValueContext;

class JsonNumberValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	REAL_OR_EXPONENT_NUMBER() {
	    return this.getToken(JSONFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
	};

	SIGNED_INT() {
	    return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJsonNumberValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJsonNumberValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJsonNumberValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JsonNumberValueContext = JsonNumberValueContext;


JSONFormulaParser.FormulaContext = FormulaContext; 
JSONFormulaParser.ExpressionContext = ExpressionContext; 
JSONFormulaParser.ChainedExpressionContext = ChainedExpressionContext; 
JSONFormulaParser.WildcardContext = WildcardContext; 
JSONFormulaParser.MultiSelectListContext = MultiSelectListContext; 
JSONFormulaParser.MultiSelectHashContext = MultiSelectHashContext; 
JSONFormulaParser.KeyvalExprContext = KeyvalExprContext; 
JSONFormulaParser.IndexExpressionContext = IndexExpressionContext; 
JSONFormulaParser.ChainedBracketSpecifierContext = ChainedBracketSpecifierContext; 
JSONFormulaParser.SliceContext = SliceContext; 
JSONFormulaParser.FunctionExpressionContext = FunctionExpressionContext; 
JSONFormulaParser.FunctionArgContext = FunctionArgContext; 
JSONFormulaParser.CurrentNodeContext = CurrentNodeContext; 
JSONFormulaParser.ExpressionTypeContext = ExpressionTypeContext; 
JSONFormulaParser.LiteralContext = LiteralContext; 
JSONFormulaParser.IdentifierContext = IdentifierContext; 
JSONFormulaParser.JsonObjectContext = JsonObjectContext; 
JSONFormulaParser.JsonObjectPairContext = JsonObjectPairContext; 
JSONFormulaParser.JsonArrayContext = JsonArrayContext; 
JSONFormulaParser.JsonValueContext = JsonValueContext; 

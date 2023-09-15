// Generated from antlr/jsonFormula.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import jsonFormulaListener from './jsonFormulaListener.js';
import jsonFormulaVisitor from './jsonFormulaVisitor.js';

const serializedATN = [4,1,30,243,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,
0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,3,1,63,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,88,8,1,10,1,12,1,91,9,1,
1,2,1,2,1,2,1,2,1,2,3,2,98,8,2,1,3,1,3,1,4,1,4,1,4,1,4,5,4,106,8,4,10,4,
12,4,109,9,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,5,5,119,8,5,10,5,12,5,122,9,
5,1,5,1,5,3,5,126,8,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,148,8,7,1,8,1,8,1,8,1,8,1,8,3,8,155,8,
8,1,9,3,9,158,8,9,1,9,1,9,3,9,162,8,9,1,9,1,9,3,9,166,8,9,3,9,168,8,9,1,
10,1,10,1,10,1,10,1,10,5,10,175,8,10,10,10,12,10,178,9,10,1,10,1,10,1,10,
1,10,1,10,3,10,185,8,10,1,11,1,11,3,11,189,8,11,1,12,1,12,1,13,1,13,1,13,
1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,5,16,206,8,16,10,16,12,
16,209,9,16,1,16,1,16,1,16,1,16,3,16,215,8,16,1,17,1,17,1,17,1,17,1,18,1,
18,1,18,1,18,5,18,225,8,18,10,18,12,18,228,9,18,1,18,1,18,1,18,1,18,3,18,
234,8,18,1,19,1,19,1,19,1,19,1,19,3,19,241,8,19,1,19,0,1,2,20,0,2,4,6,8,
10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,0,5,1,0,26,27,1,0,28,29,1,0,
2,5,1,0,6,7,1,0,24,25,269,0,40,1,0,0,0,2,62,1,0,0,0,4,97,1,0,0,0,6,99,1,
0,0,0,8,101,1,0,0,0,10,125,1,0,0,0,12,127,1,0,0,0,14,147,1,0,0,0,16,154,
1,0,0,0,18,157,1,0,0,0,20,184,1,0,0,0,22,188,1,0,0,0,24,190,1,0,0,0,26,192,
1,0,0,0,28,195,1,0,0,0,30,199,1,0,0,0,32,214,1,0,0,0,34,216,1,0,0,0,36,233,
1,0,0,0,38,240,1,0,0,0,40,41,3,2,1,0,41,42,5,0,0,1,42,1,1,0,0,0,43,44,6,
1,-1,0,44,63,3,14,7,0,45,63,3,30,15,0,46,47,5,10,0,0,47,63,3,2,1,12,48,49,
5,7,0,0,49,63,3,2,1,11,50,51,5,11,0,0,51,52,3,2,1,0,52,53,5,12,0,0,53,63,
1,0,0,0,54,63,3,6,3,0,55,63,3,8,4,0,56,63,3,10,5,0,57,63,3,28,14,0,58,63,
3,20,10,0,59,63,7,0,0,0,60,63,7,1,0,0,61,63,3,24,12,0,62,43,1,0,0,0,62,45,
1,0,0,0,62,46,1,0,0,0,62,48,1,0,0,0,62,50,1,0,0,0,62,54,1,0,0,0,62,55,1,
0,0,0,62,56,1,0,0,0,62,57,1,0,0,0,62,58,1,0,0,0,62,59,1,0,0,0,62,60,1,0,
0,0,62,61,1,0,0,0,63,89,1,0,0,0,64,65,10,18,0,0,65,66,7,2,0,0,66,88,3,2,
1,19,67,68,10,17,0,0,68,69,7,3,0,0,69,88,3,2,1,18,70,71,10,16,0,0,71,72,
5,23,0,0,72,88,3,2,1,17,73,74,10,15,0,0,74,75,5,8,0,0,75,88,3,2,1,16,76,
77,10,14,0,0,77,78,5,9,0,0,78,88,3,2,1,15,79,80,10,4,0,0,80,81,5,13,0,0,
81,88,3,2,1,5,82,83,10,21,0,0,83,84,5,1,0,0,84,88,3,4,2,0,85,86,10,20,0,
0,86,88,3,16,8,0,87,64,1,0,0,0,87,67,1,0,0,0,87,70,1,0,0,0,87,73,1,0,0,0,
87,76,1,0,0,0,87,79,1,0,0,0,87,82,1,0,0,0,87,85,1,0,0,0,88,91,1,0,0,0,89,
87,1,0,0,0,89,90,1,0,0,0,90,3,1,0,0,0,91,89,1,0,0,0,92,98,3,30,15,0,93,98,
3,8,4,0,94,98,3,10,5,0,95,98,3,20,10,0,96,98,3,6,3,0,97,92,1,0,0,0,97,93,
1,0,0,0,97,94,1,0,0,0,97,95,1,0,0,0,97,96,1,0,0,0,98,5,1,0,0,0,99,100,5,
2,0,0,100,7,1,0,0,0,101,102,5,14,0,0,102,107,3,2,1,0,103,104,5,15,0,0,104,
106,3,2,1,0,105,103,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,0,107,108,1,0,
0,0,108,110,1,0,0,0,109,107,1,0,0,0,110,111,5,16,0,0,111,9,1,0,0,0,112,113,
5,17,0,0,113,126,5,18,0,0,114,115,5,17,0,0,115,120,3,12,6,0,116,117,5,15,
0,0,117,119,3,12,6,0,118,116,1,0,0,0,119,122,1,0,0,0,120,118,1,0,0,0,120,
121,1,0,0,0,121,123,1,0,0,0,122,120,1,0,0,0,123,124,5,18,0,0,124,126,1,0,
0,0,125,112,1,0,0,0,125,114,1,0,0,0,126,11,1,0,0,0,127,128,3,30,15,0,128,
129,5,19,0,0,129,130,3,2,1,0,130,13,1,0,0,0,131,132,5,14,0,0,132,133,5,29,
0,0,133,148,5,16,0,0,134,135,5,14,0,0,135,136,5,2,0,0,136,148,5,16,0,0,137,
138,5,14,0,0,138,139,3,18,9,0,139,140,5,16,0,0,140,148,1,0,0,0,141,142,5,
14,0,0,142,148,5,16,0,0,143,144,5,20,0,0,144,145,3,2,1,0,145,146,5,16,0,
0,146,148,1,0,0,0,147,131,1,0,0,0,147,134,1,0,0,0,147,137,1,0,0,0,147,141,
1,0,0,0,147,143,1,0,0,0,148,15,1,0,0,0,149,155,3,14,7,0,150,151,5,14,0,0,
151,152,3,2,1,0,152,153,5,16,0,0,153,155,1,0,0,0,154,149,1,0,0,0,154,150,
1,0,0,0,155,17,1,0,0,0,156,158,3,2,1,0,157,156,1,0,0,0,157,158,1,0,0,0,158,
159,1,0,0,0,159,161,5,19,0,0,160,162,3,2,1,0,161,160,1,0,0,0,161,162,1,0,
0,0,162,167,1,0,0,0,163,165,5,19,0,0,164,166,3,2,1,0,165,164,1,0,0,0,165,
166,1,0,0,0,166,168,1,0,0,0,167,163,1,0,0,0,167,168,1,0,0,0,168,19,1,0,0,
0,169,170,5,24,0,0,170,171,5,11,0,0,171,176,3,22,11,0,172,173,5,15,0,0,173,
175,3,22,11,0,174,172,1,0,0,0,175,178,1,0,0,0,176,174,1,0,0,0,176,177,1,
0,0,0,177,179,1,0,0,0,178,176,1,0,0,0,179,180,5,12,0,0,180,185,1,0,0,0,181,
182,5,24,0,0,182,183,5,11,0,0,183,185,5,12,0,0,184,169,1,0,0,0,184,181,1,
0,0,0,185,21,1,0,0,0,186,189,3,2,1,0,187,189,3,26,13,0,188,186,1,0,0,0,188,
187,1,0,0,0,189,23,1,0,0,0,190,191,5,21,0,0,191,25,1,0,0,0,192,193,5,4,0,
0,193,194,3,2,1,0,194,27,1,0,0,0,195,196,5,22,0,0,196,197,3,38,19,0,197,
198,5,22,0,0,198,29,1,0,0,0,199,200,7,4,0,0,200,31,1,0,0,0,201,202,5,17,
0,0,202,207,3,34,17,0,203,204,5,15,0,0,204,206,3,34,17,0,205,203,1,0,0,0,
206,209,1,0,0,0,207,205,1,0,0,0,207,208,1,0,0,0,208,210,1,0,0,0,209,207,
1,0,0,0,210,211,5,18,0,0,211,215,1,0,0,0,212,213,5,17,0,0,213,215,5,18,0,
0,214,201,1,0,0,0,214,212,1,0,0,0,215,33,1,0,0,0,216,217,5,26,0,0,217,218,
5,19,0,0,218,219,3,38,19,0,219,35,1,0,0,0,220,221,5,14,0,0,221,226,3,38,
19,0,222,223,5,15,0,0,223,225,3,38,19,0,224,222,1,0,0,0,225,228,1,0,0,0,
226,224,1,0,0,0,226,227,1,0,0,0,227,229,1,0,0,0,228,226,1,0,0,0,229,230,
5,16,0,0,230,234,1,0,0,0,231,232,5,14,0,0,232,234,5,16,0,0,233,220,1,0,0,
0,233,231,1,0,0,0,234,37,1,0,0,0,235,241,5,26,0,0,236,241,7,1,0,0,237,241,
3,32,16,0,238,241,3,36,18,0,239,241,5,24,0,0,240,235,1,0,0,0,240,236,1,0,
0,0,240,237,1,0,0,0,240,238,1,0,0,0,240,239,1,0,0,0,241,39,1,0,0,0,21,62,
87,89,97,107,120,125,147,154,157,161,165,167,176,184,188,207,214,226,233,
240];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class jsonFormulaParser extends antlr4.Parser {

    static grammarFileName = "jsonFormula.g4";
    static literalNames = [ null, "'.'", "'*'", "'/'", "'&'", "'~'", "'+'", 
                            "'-'", "'&&'", "'||'", "'!'", "'('", "')'", 
                            "'|'", "'['", "','", "']'", "'{'", "'}'", "':'", 
                            "'[?'", "'@'", "'`'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, "COMPARATOR", 
                             "NAME", "QUOTED_NAME", "STRING", "RAW_STRING", 
                             "REAL_OR_EXPONENT_NUMBER", "SIGNED_INT", "WS" ];
    static ruleNames = [ "formula", "expression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "indexExpression", "chainedBracketSpecifier", "slice", 
                         "functionExpression", "functionArg", "currentNode", 
                         "expressionType", "literal", "identifier", "jsonObject", 
                         "jsonObjectPair", "jsonArray", "jsonValue" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = jsonFormulaParser.ruleNames;
        this.literalNames = jsonFormulaParser.literalNames;
        this.symbolicNames = jsonFormulaParser.symbolicNames;
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
	    this.enterRule(localctx, 0, jsonFormulaParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 40;
	        this.expression(0);
	        this.state = 41;
	        this.match(jsonFormulaParser.EOF);
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
	    this.enterRecursionRule(localctx, 2, jsonFormulaParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new IndexedExpressionContext(this, localctx);
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
	            this.match(jsonFormulaParser.T__9);
	            this.state = 47;
	            this.expression(12);
	            break;

	        case 4:
	            localctx = new UnaryMinusExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 48;
	            this.match(jsonFormulaParser.T__6);
	            this.state = 49;
	            this.expression(11);
	            break;

	        case 5:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            this.match(jsonFormulaParser.T__10);
	            this.state = 51;
	            this.expression(0);
	            this.state = 52;
	            this.match(jsonFormulaParser.T__11);
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
	            if(!(_la===26 || _la===27)) {
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
	            if(!(_la===28 || _la===29)) {
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
	        this.state = 89;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 87;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MultDivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 64;
	                    if (!( this.precpred(this._ctx, 18))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
	                    }
	                    this.state = 65;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 60) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 66;
	                    this.expression(19);
	                    break;

	                case 2:
	                    localctx = new AddSubtractExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 67;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 68;
	                    _la = this._input.LA(1);
	                    if(!(_la===6 || _la===7)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 69;
	                    this.expression(18);
	                    break;

	                case 3:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 70;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 71;
	                    this.match(jsonFormulaParser.COMPARATOR);
	                    this.state = 72;
	                    this.expression(17);
	                    break;

	                case 4:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 73;
	                    if (!( this.precpred(this._ctx, 15))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
	                    }
	                    this.state = 74;
	                    this.match(jsonFormulaParser.T__7);
	                    this.state = 75;
	                    this.expression(16);
	                    break;

	                case 5:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 76;
	                    if (!( this.precpred(this._ctx, 14))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
	                    }
	                    this.state = 77;
	                    this.match(jsonFormulaParser.T__8);
	                    this.state = 78;
	                    this.expression(15);
	                    break;

	                case 6:
	                    localctx = new PipeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 79;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 80;
	                    this.match(jsonFormulaParser.T__12);
	                    this.state = 81;
	                    this.expression(5);
	                    break;

	                case 7:
	                    localctx = new ChainExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 82;
	                    if (!( this.precpred(this._ctx, 21))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
	                    }
	                    this.state = 83;
	                    this.match(jsonFormulaParser.T__0);
	                    this.state = 84;
	                    this.chainedExpression();
	                    break;

	                case 8:
	                    localctx = new BracketedExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, jsonFormulaParser.RULE_expression);
	                    this.state = 85;
	                    if (!( this.precpred(this._ctx, 20))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
	                    }
	                    this.state = 86;
	                    this.chainedBracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 91;
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
	    this.enterRule(localctx, 4, jsonFormulaParser.RULE_chainedExpression);
	    try {
	        this.state = 97;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 92;
	            this.identifier();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 93;
	            this.multiSelectList();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 94;
	            this.multiSelectHash();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 95;
	            this.functionExpression();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 96;
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
	    this.enterRule(localctx, 6, jsonFormulaParser.RULE_wildcard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 99;
	        this.match(jsonFormulaParser.T__1);
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
	    this.enterRule(localctx, 8, jsonFormulaParser.RULE_multiSelectList);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 101;
	        this.match(jsonFormulaParser.T__13);
	        this.state = 102;
	        this.expression(0);
	        this.state = 107;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 103;
	            this.match(jsonFormulaParser.T__14);
	            this.state = 104;
	            this.expression(0);
	            this.state = 109;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 110;
	        this.match(jsonFormulaParser.T__15);
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
	    this.enterRule(localctx, 10, jsonFormulaParser.RULE_multiSelectHash);
	    var _la = 0;
	    try {
	        this.state = 125;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new EmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 112;
	            this.match(jsonFormulaParser.T__16);
	            this.state = 113;
	            this.match(jsonFormulaParser.T__17);
	            break;

	        case 2:
	            localctx = new NonEmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 114;
	            this.match(jsonFormulaParser.T__16);
	            this.state = 115;
	            this.keyvalExpr();
	            this.state = 120;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 116;
	                this.match(jsonFormulaParser.T__14);
	                this.state = 117;
	                this.keyvalExpr();
	                this.state = 122;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 123;
	            this.match(jsonFormulaParser.T__17);
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
	    this.enterRule(localctx, 12, jsonFormulaParser.RULE_keyvalExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 127;
	        this.identifier();
	        this.state = 128;
	        this.match(jsonFormulaParser.T__18);
	        this.state = 129;
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
	    this.enterRule(localctx, 14, jsonFormulaParser.RULE_indexExpression);
	    try {
	        this.state = 147;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 131;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 132;
	            this.match(jsonFormulaParser.SIGNED_INT);
	            this.state = 133;
	            this.match(jsonFormulaParser.T__15);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 134;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 135;
	            this.match(jsonFormulaParser.T__1);
	            this.state = 136;
	            this.match(jsonFormulaParser.T__15);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 137;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 138;
	            this.slice();
	            this.state = 139;
	            this.match(jsonFormulaParser.T__15);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 141;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 142;
	            this.match(jsonFormulaParser.T__15);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 143;
	            this.match(jsonFormulaParser.T__19);
	            this.state = 144;
	            this.expression(0);
	            this.state = 145;
	            this.match(jsonFormulaParser.T__15);
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
	    this.enterRule(localctx, 16, jsonFormulaParser.RULE_chainedBracketSpecifier);
	    try {
	        this.state = 154;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedBracketContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 149;
	            this.indexExpression();
	            break;

	        case 2:
	            localctx = new ChainedBracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 150;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 151;
	            this.expression(0);
	            this.state = 152;
	            this.match(jsonFormulaParser.T__15);
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
	    this.enterRule(localctx, 18, jsonFormulaParser.RULE_slice);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 1064455300) !== 0)) {
	            this.state = 156;
	            localctx.start = this.expression(0);
	        }

	        this.state = 159;
	        this.match(jsonFormulaParser.T__18);
	        this.state = 161;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 1064455300) !== 0)) {
	            this.state = 160;
	            localctx.stop = this.expression(0);
	        }

	        this.state = 167;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===19) {
	            this.state = 163;
	            this.match(jsonFormulaParser.T__18);
	            this.state = 165;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 1064455300) !== 0)) {
	                this.state = 164;
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
	    this.enterRule(localctx, 20, jsonFormulaParser.RULE_functionExpression);
	    var _la = 0;
	    try {
	        this.state = 184;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 169;
	            this.match(jsonFormulaParser.NAME);
	            this.state = 170;
	            this.match(jsonFormulaParser.T__10);
	            this.state = 171;
	            this.functionArg();
	            this.state = 176;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 172;
	                this.match(jsonFormulaParser.T__14);
	                this.state = 173;
	                this.functionArg();
	                this.state = 178;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 179;
	            this.match(jsonFormulaParser.T__11);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 181;
	            this.match(jsonFormulaParser.NAME);
	            this.state = 182;
	            this.match(jsonFormulaParser.T__10);
	            this.state = 183;
	            this.match(jsonFormulaParser.T__11);
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
	    this.enterRule(localctx, 22, jsonFormulaParser.RULE_functionArg);
	    try {
	        this.state = 188;
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
	        case 22:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 186;
	            this.expression(0);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 187;
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
	    this.enterRule(localctx, 24, jsonFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 190;
	        this.match(jsonFormulaParser.T__20);
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
	    this.enterRule(localctx, 26, jsonFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 192;
	        this.match(jsonFormulaParser.T__3);
	        this.state = 193;
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
	    this.enterRule(localctx, 28, jsonFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 195;
	        this.match(jsonFormulaParser.T__21);
	        this.state = 196;
	        this.jsonValue();
	        this.state = 197;
	        this.match(jsonFormulaParser.T__21);
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
	    this.enterRule(localctx, 30, jsonFormulaParser.RULE_identifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 199;
	        _la = this._input.LA(1);
	        if(!(_la===24 || _la===25)) {
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
	    this.enterRule(localctx, 32, jsonFormulaParser.RULE_jsonObject);
	    var _la = 0;
	    try {
	        this.state = 214;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 201;
	            this.match(jsonFormulaParser.T__16);
	            this.state = 202;
	            this.jsonObjectPair();
	            this.state = 207;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 203;
	                this.match(jsonFormulaParser.T__14);
	                this.state = 204;
	                this.jsonObjectPair();
	                this.state = 209;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 210;
	            this.match(jsonFormulaParser.T__17);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 212;
	            this.match(jsonFormulaParser.T__16);
	            this.state = 213;
	            this.match(jsonFormulaParser.T__17);
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
	    this.enterRule(localctx, 34, jsonFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 216;
	        this.match(jsonFormulaParser.STRING);
	        this.state = 217;
	        this.match(jsonFormulaParser.T__18);
	        this.state = 218;
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
	    this.enterRule(localctx, 36, jsonFormulaParser.RULE_jsonArray);
	    var _la = 0;
	    try {
	        this.state = 233;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 220;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 221;
	            this.jsonValue();
	            this.state = 226;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===15) {
	                this.state = 222;
	                this.match(jsonFormulaParser.T__14);
	                this.state = 223;
	                this.jsonValue();
	                this.state = 228;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 229;
	            this.match(jsonFormulaParser.T__15);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 231;
	            this.match(jsonFormulaParser.T__13);
	            this.state = 232;
	            this.match(jsonFormulaParser.T__15);
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
	    this.enterRule(localctx, 38, jsonFormulaParser.RULE_jsonValue);
	    var _la = 0;
	    try {
	        this.state = 240;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 26:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 235;
	            this.match(jsonFormulaParser.STRING);
	            break;
	        case 28:
	        case 29:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 236;
	            _la = this._input.LA(1);
	            if(!(_la===28 || _la===29)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case 17:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 237;
	            this.jsonObject();
	            break;
	        case 14:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 238;
	            this.jsonArray();
	            break;
	        case 24:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 239;
	            this.match(jsonFormulaParser.NAME);
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

jsonFormulaParser.EOF = antlr4.Token.EOF;
jsonFormulaParser.T__0 = 1;
jsonFormulaParser.T__1 = 2;
jsonFormulaParser.T__2 = 3;
jsonFormulaParser.T__3 = 4;
jsonFormulaParser.T__4 = 5;
jsonFormulaParser.T__5 = 6;
jsonFormulaParser.T__6 = 7;
jsonFormulaParser.T__7 = 8;
jsonFormulaParser.T__8 = 9;
jsonFormulaParser.T__9 = 10;
jsonFormulaParser.T__10 = 11;
jsonFormulaParser.T__11 = 12;
jsonFormulaParser.T__12 = 13;
jsonFormulaParser.T__13 = 14;
jsonFormulaParser.T__14 = 15;
jsonFormulaParser.T__15 = 16;
jsonFormulaParser.T__16 = 17;
jsonFormulaParser.T__17 = 18;
jsonFormulaParser.T__18 = 19;
jsonFormulaParser.T__19 = 20;
jsonFormulaParser.T__20 = 21;
jsonFormulaParser.T__21 = 22;
jsonFormulaParser.COMPARATOR = 23;
jsonFormulaParser.NAME = 24;
jsonFormulaParser.QUOTED_NAME = 25;
jsonFormulaParser.STRING = 26;
jsonFormulaParser.RAW_STRING = 27;
jsonFormulaParser.REAL_OR_EXPONENT_NUMBER = 28;
jsonFormulaParser.SIGNED_INT = 29;
jsonFormulaParser.WS = 30;

jsonFormulaParser.RULE_formula = 0;
jsonFormulaParser.RULE_expression = 1;
jsonFormulaParser.RULE_chainedExpression = 2;
jsonFormulaParser.RULE_wildcard = 3;
jsonFormulaParser.RULE_multiSelectList = 4;
jsonFormulaParser.RULE_multiSelectHash = 5;
jsonFormulaParser.RULE_keyvalExpr = 6;
jsonFormulaParser.RULE_indexExpression = 7;
jsonFormulaParser.RULE_chainedBracketSpecifier = 8;
jsonFormulaParser.RULE_slice = 9;
jsonFormulaParser.RULE_functionExpression = 10;
jsonFormulaParser.RULE_functionArg = 11;
jsonFormulaParser.RULE_currentNode = 12;
jsonFormulaParser.RULE_expressionType = 13;
jsonFormulaParser.RULE_literal = 14;
jsonFormulaParser.RULE_identifier = 15;
jsonFormulaParser.RULE_jsonObject = 16;
jsonFormulaParser.RULE_jsonObjectPair = 17;
jsonFormulaParser.RULE_jsonArray = 18;
jsonFormulaParser.RULE_jsonValue = 19;

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
        this.ruleIndex = jsonFormulaParser.RULE_formula;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	EOF() {
	    return this.getToken(jsonFormulaParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterFormula(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitFormula(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_expression;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterPipeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitPipeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitPipeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.PipeExpressionContext = PipeExpressionContext;

class IdentifierExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterIdentifierExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitIdentifierExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitIdentifierExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.IdentifierExpressionContext = IdentifierExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterMultDivExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitMultDivExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitMultDivExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.MultDivExpressionContext = MultDivExpressionContext;

class NotExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterNotExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitNotExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitNotExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.NotExpressionContext = NotExpressionContext;

class RawStringExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STRING() {
	    return this.getToken(jsonFormulaParser.STRING, 0);
	};

	RAW_STRING() {
	    return this.getToken(jsonFormulaParser.RAW_STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterRawStringExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitRawStringExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitRawStringExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.RawStringExpressionContext = RawStringExpressionContext;

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
	    return this.getToken(jsonFormulaParser.COMPARATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterComparisonExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitComparisonExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitComparisonExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.ComparisonExpressionContext = ComparisonExpressionContext;

class ParenExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterParenExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitParenExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitParenExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.ParenExpressionContext = ParenExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterOrExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitOrExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitOrExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.OrExpressionContext = OrExpressionContext;

class UnaryMinusExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterUnaryMinusExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitUnaryMinusExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitUnaryMinusExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.UnaryMinusExpressionContext = UnaryMinusExpressionContext;

class CurrentNodeExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	currentNode() {
	    return this.getTypedRuleContext(CurrentNodeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterCurrentNodeExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitCurrentNodeExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitCurrentNodeExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.CurrentNodeExpressionContext = CurrentNodeExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterChainExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitChainExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitChainExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.ChainExpressionContext = ChainExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterAndExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitAndExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitAndExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.AndExpressionContext = AndExpressionContext;

class MultiSelectHashExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectHash() {
	    return this.getTypedRuleContext(MultiSelectHashContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterMultiSelectHashExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitMultiSelectHashExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitMultiSelectHashExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.MultiSelectHashExpressionContext = MultiSelectHashExpressionContext;

class WildcardExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	wildcard() {
	    return this.getTypedRuleContext(WildcardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterWildcardExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitWildcardExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitWildcardExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.WildcardExpressionContext = WildcardExpressionContext;

class FunctionCallExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functionExpression() {
	    return this.getTypedRuleContext(FunctionExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterFunctionCallExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitFunctionCallExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitFunctionCallExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.FunctionCallExpressionContext = FunctionCallExpressionContext;

class IndexedExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	indexExpression() {
	    return this.getTypedRuleContext(IndexExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterIndexedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitIndexedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitIndexedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.IndexedExpressionContext = IndexedExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterAddSubtractExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitAddSubtractExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitAddSubtractExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.AddSubtractExpressionContext = AddSubtractExpressionContext;

class MultiSelectListExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectList() {
	    return this.getTypedRuleContext(MultiSelectListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterMultiSelectListExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitMultiSelectListExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitMultiSelectListExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.MultiSelectListExpressionContext = MultiSelectListExpressionContext;

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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterBracketedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitBracketedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitBracketedExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.BracketedExpressionContext = BracketedExpressionContext;

class LiteralExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterLiteralExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitLiteralExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitLiteralExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.LiteralExpressionContext = LiteralExpressionContext;

class NumberLiteralContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	REAL_OR_EXPONENT_NUMBER() {
	    return this.getToken(jsonFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
	};

	SIGNED_INT() {
	    return this.getToken(jsonFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterNumberLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitNumberLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitNumberLiteral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.NumberLiteralContext = NumberLiteralContext;

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
        this.ruleIndex = jsonFormulaParser.RULE_chainedExpression;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterChainedExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitChainedExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_wildcard;
    }


	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterWildcard(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitWildcard(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_multiSelectList;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterMultiSelectList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitMultiSelectList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_multiSelectHash;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterNonEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitNonEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitNonEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.NonEmptyHashContext = NonEmptyHashContext;

class EmptyHashContext extends MultiSelectHashContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterEmptyHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitEmptyHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitEmptyHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.EmptyHashContext = EmptyHashContext;

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
        this.ruleIndex = jsonFormulaParser.RULE_keyvalExpr;
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterKeyvalExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitKeyvalExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_indexExpression;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterSelect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitSelect(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitSelect(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.SelectContext = SelectContext;

class BracketFlattenContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterBracketFlatten(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitBracketFlatten(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitBracketFlatten(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.BracketFlattenContext = BracketFlattenContext;

class BracketSliceContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	slice() {
	    return this.getTypedRuleContext(SliceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterBracketSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitBracketSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitBracketSlice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.BracketSliceContext = BracketSliceContext;

class BracketIndexContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	SIGNED_INT() {
	    return this.getToken(jsonFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.BracketIndexContext = BracketIndexContext;

class BracketStarContext extends IndexExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterBracketStar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitBracketStar(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitBracketStar(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.BracketStarContext = BracketStarContext;

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
        this.ruleIndex = jsonFormulaParser.RULE_chainedBracketSpecifier;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterChainedBracket(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitChainedBracket(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitChainedBracket(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.ChainedBracketContext = ChainedBracketContext;

class ChainedBracketIndexContext extends ChainedBracketSpecifierContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterChainedBracketIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitChainedBracketIndex(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitChainedBracketIndex(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.ChainedBracketIndexContext = ChainedBracketIndexContext;

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
        this.ruleIndex = jsonFormulaParser.RULE_slice;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterSlice(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitSlice(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_functionExpression;
    }

	NAME() {
	    return this.getToken(jsonFormulaParser.NAME, 0);
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterFunctionExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitFunctionExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_functionArg;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	expressionType() {
	    return this.getTypedRuleContext(ExpressionTypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterFunctionArg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitFunctionArg(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_currentNode;
    }


	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterCurrentNode(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitCurrentNode(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_expressionType;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterExpressionType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitExpressionType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_literal;
    }

	jsonValue() {
	    return this.getTypedRuleContext(JsonValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitLiteral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_identifier;
    }

	NAME() {
	    return this.getToken(jsonFormulaParser.NAME, 0);
	};

	QUOTED_NAME() {
	    return this.getToken(jsonFormulaParser.QUOTED_NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitIdentifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_jsonObject;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonObject(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonObject(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_jsonObjectPair;
    }

	STRING() {
	    return this.getToken(jsonFormulaParser.STRING, 0);
	};

	jsonValue() {
	    return this.getTypedRuleContext(JsonValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonObjectPair(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonObjectPair(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_jsonArray;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonArray(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonArray(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
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
        this.ruleIndex = jsonFormulaParser.RULE_jsonValue;
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
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonArrayValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonArrayValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitJsonArrayValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.JsonArrayValueContext = JsonArrayValueContext;

class JsonStringValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	STRING() {
	    return this.getToken(jsonFormulaParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonStringValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonStringValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitJsonStringValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.JsonStringValueContext = JsonStringValueContext;

class JsonObjectValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jsonObject() {
	    return this.getTypedRuleContext(JsonObjectContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonObjectValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonObjectValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitJsonObjectValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.JsonObjectValueContext = JsonObjectValueContext;

class JsonConstantValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NAME() {
	    return this.getToken(jsonFormulaParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonConstantValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonConstantValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitJsonConstantValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.JsonConstantValueContext = JsonConstantValueContext;

class JsonNumberValueContext extends JsonValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	REAL_OR_EXPONENT_NUMBER() {
	    return this.getToken(jsonFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
	};

	SIGNED_INT() {
	    return this.getToken(jsonFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.enterJsonNumberValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof jsonFormulaListener ) {
	        listener.exitJsonNumberValue(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof jsonFormulaVisitor ) {
	        return visitor.visitJsonNumberValue(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

jsonFormulaParser.JsonNumberValueContext = JsonNumberValueContext;


jsonFormulaParser.FormulaContext = FormulaContext; 
jsonFormulaParser.ExpressionContext = ExpressionContext; 
jsonFormulaParser.ChainedExpressionContext = ChainedExpressionContext; 
jsonFormulaParser.WildcardContext = WildcardContext; 
jsonFormulaParser.MultiSelectListContext = MultiSelectListContext; 
jsonFormulaParser.MultiSelectHashContext = MultiSelectHashContext; 
jsonFormulaParser.KeyvalExprContext = KeyvalExprContext; 
jsonFormulaParser.IndexExpressionContext = IndexExpressionContext; 
jsonFormulaParser.ChainedBracketSpecifierContext = ChainedBracketSpecifierContext; 
jsonFormulaParser.SliceContext = SliceContext; 
jsonFormulaParser.FunctionExpressionContext = FunctionExpressionContext; 
jsonFormulaParser.FunctionArgContext = FunctionArgContext; 
jsonFormulaParser.CurrentNodeContext = CurrentNodeContext; 
jsonFormulaParser.ExpressionTypeContext = ExpressionTypeContext; 
jsonFormulaParser.LiteralContext = LiteralContext; 
jsonFormulaParser.IdentifierContext = IdentifierContext; 
jsonFormulaParser.JsonObjectContext = JsonObjectContext; 
jsonFormulaParser.JsonObjectPairContext = JsonObjectPairContext; 
jsonFormulaParser.JsonArrayContext = JsonArrayContext; 
jsonFormulaParser.JsonValueContext = JsonValueContext; 

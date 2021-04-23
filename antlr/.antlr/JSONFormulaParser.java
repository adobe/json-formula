// Generated from /Users/johnbrinkman/dev/json-formula/antlr/JSONFormula.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class JSONFormulaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		SIGNED_INT=25, NUMBER=26, FUNCTIONS=27, COMPARATOR=28, RAW_STRING=29, 
		JSON_CONSTANT=30, NAME=31, STRING=32, REAL_OR_EXPONENT_NUMBER=33, WS=34;
	public static final int
		RULE_formula = 0, RULE_expression = 1, RULE_unary_op = 2, RULE_binary_op = 3, 
		RULE_postfix_op = 4, RULE_function_call = 5, RULE_parameter = 6, RULE_nonempty_expr_list = 7, 
		RULE_expression_list = 8, RULE_parm_separator = 9, RULE_jmesPathExpression = 10, 
		RULE_chainedExpression = 11, RULE_wildcard = 12, RULE_multiSelectList = 13, 
		RULE_multiSelectHash = 14, RULE_keyvalExpr = 15, RULE_bracketSpecifier = 16, 
		RULE_slice = 17, RULE_functionExpression = 18, RULE_functionArg = 19, 
		RULE_currentNode = 20, RULE_expressionType = 21, RULE_literal = 22, RULE_identifier = 23, 
		RULE_jsonObject = 24, RULE_jsonObjectPair = 25, RULE_jsonArray = 26, RULE_jsonValue = 27;
	private static String[] makeRuleNames() {
		return new String[] {
			"formula", "expression", "unary_op", "binary_op", "postfix_op", "function_call", 
			"parameter", "nonempty_expr_list", "expression_list", "parm_separator", 
			"jmesPathExpression", "chainedExpression", "wildcard", "multiSelectList", 
			"multiSelectHash", "keyvalExpr", "bracketSpecifier", "slice", "functionExpression", 
			"functionArg", "currentNode", "expressionType", "literal", "identifier", 
			"jsonObject", "jsonObjectPair", "jsonArray", "jsonValue"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'('", "')'", "'+'", "'-'", "'<>'", "'&'", "'*'", "'/'", "'^'", 
			"'%'", "','", "'.'", "'&&'", "'||'", "'!'", "'|'", "'['", "']'", "'{'", 
			"'}'", "':'", "'[?'", "'@'", "'`'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "SIGNED_INT", "NUMBER", "FUNCTIONS", "COMPARATOR", "RAW_STRING", 
			"JSON_CONSTANT", "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "JSONFormula.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public JSONFormulaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class FormulaContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode EOF() { return getToken(JSONFormulaParser.EOF, 0); }
		public FormulaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formula; }
	}

	public final FormulaContext formula() throws RecognitionException {
		FormulaContext _localctx = new FormulaContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_formula);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(56);
			expression(0);
			setState(57);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class BinaryExpressionContext extends ExpressionContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public Binary_opContext binary_op() {
			return getRuleContext(Binary_opContext.class,0);
		}
		public BinaryExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class JmesPathContext extends ExpressionContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public JmesPathContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class TopLevelStringContext extends ExpressionContext {
		public TerminalNode RAW_STRING() { return getToken(JSONFormulaParser.RAW_STRING, 0); }
		public TopLevelStringContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class TopLevelIntContext extends ExpressionContext {
		public TerminalNode SIGNED_INT() { return getToken(JSONFormulaParser.SIGNED_INT, 0); }
		public TopLevelIntContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class FunctionCallContext extends ExpressionContext {
		public Function_callContext function_call() {
			return getRuleContext(Function_callContext.class,0);
		}
		public FunctionCallContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BraceExpressionContext extends ExpressionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public BraceExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class PostfixContext extends ExpressionContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public Postfix_opContext postfix_op() {
			return getRuleContext(Postfix_opContext.class,0);
		}
		public PostfixContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class UnaryExpressionContext extends ExpressionContext {
		public Unary_opContext unary_op() {
			return getRuleContext(Unary_opContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public UnaryExpressionContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class TopLevelNumberContext extends ExpressionContext {
		public TerminalNode NUMBER() { return getToken(JSONFormulaParser.NUMBER, 0); }
		public TopLevelNumberContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 2;
		enterRecursionRule(_localctx, 2, RULE_expression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(72);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				_localctx = new TopLevelIntContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(60);
				match(SIGNED_INT);
				}
				break;
			case 2:
				{
				_localctx = new TopLevelNumberContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(61);
				match(NUMBER);
				}
				break;
			case 3:
				{
				_localctx = new TopLevelStringContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(62);
				match(RAW_STRING);
				}
				break;
			case 4:
				{
				_localctx = new UnaryExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(63);
				unary_op();
				setState(64);
				expression(5);
				}
				break;
			case 5:
				{
				_localctx = new BraceExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(66);
				match(T__0);
				setState(67);
				expression(0);
				setState(68);
				match(T__1);
				}
				break;
			case 6:
				{
				_localctx = new FunctionCallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(70);
				function_call();
				}
				break;
			case 7:
				{
				_localctx = new JmesPathContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(71);
				jmesPathExpression(0);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(82);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(80);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
					case 1:
						{
						_localctx = new BinaryExpressionContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(74);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(75);
						binary_op();
						setState(76);
						expression(7);
						}
						break;
					case 2:
						{
						_localctx = new PostfixContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(78);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(79);
						postfix_op();
						}
						break;
					}
					} 
				}
				setState(84);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class Unary_opContext extends ParserRuleContext {
		public Unary_opContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unary_op; }
	}

	public final Unary_opContext unary_op() throws RecognitionException {
		Unary_opContext _localctx = new Unary_opContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_unary_op);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(85);
			_la = _input.LA(1);
			if ( !(_la==T__2 || _la==T__3) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Binary_opContext extends ParserRuleContext {
		public TerminalNode COMPARATOR() { return getToken(JSONFormulaParser.COMPARATOR, 0); }
		public Binary_opContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binary_op; }
	}

	public final Binary_opContext binary_op() throws RecognitionException {
		Binary_opContext _localctx = new Binary_opContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_binary_op);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(87);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << COMPARATOR))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Postfix_opContext extends ParserRuleContext {
		public Postfix_opContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_postfix_op; }
	}

	public final Postfix_opContext postfix_op() throws RecognitionException {
		Postfix_opContext _localctx = new Postfix_opContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_postfix_op);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(89);
			match(T__9);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Function_callContext extends ParserRuleContext {
		public TerminalNode FUNCTIONS() { return getToken(JSONFormulaParser.FUNCTIONS, 0); }
		public Expression_listContext expression_list() {
			return getRuleContext(Expression_listContext.class,0);
		}
		public Function_callContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function_call; }
	}

	public final Function_callContext function_call() throws RecognitionException {
		Function_callContext _localctx = new Function_callContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_function_call);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			match(FUNCTIONS);
			setState(92);
			match(T__0);
			setState(93);
			expression_list();
			setState(94);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameter; }
	}

	public final ParameterContext parameter() throws RecognitionException {
		ParameterContext _localctx = new ParameterContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_parameter);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(96);
			expression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Nonempty_expr_listContext extends ParserRuleContext {
		public ParameterContext parameter() {
			return getRuleContext(ParameterContext.class,0);
		}
		public Nonempty_expr_listContext nonempty_expr_list() {
			return getRuleContext(Nonempty_expr_listContext.class,0);
		}
		public Parm_separatorContext parm_separator() {
			return getRuleContext(Parm_separatorContext.class,0);
		}
		public Nonempty_expr_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nonempty_expr_list; }
	}

	public final Nonempty_expr_listContext nonempty_expr_list() throws RecognitionException {
		return nonempty_expr_list(0);
	}

	private Nonempty_expr_listContext nonempty_expr_list(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		Nonempty_expr_listContext _localctx = new Nonempty_expr_listContext(_ctx, _parentState);
		Nonempty_expr_listContext _prevctx = _localctx;
		int _startState = 14;
		enterRecursionRule(_localctx, 14, RULE_nonempty_expr_list, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(99);
			parameter();
			}
			_ctx.stop = _input.LT(-1);
			setState(107);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new Nonempty_expr_listContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_nonempty_expr_list);
					setState(101);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(102);
					parm_separator();
					setState(103);
					parameter();
					}
					} 
				}
				setState(109);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class Expression_listContext extends ParserRuleContext {
		public Nonempty_expr_listContext nonempty_expr_list() {
			return getRuleContext(Nonempty_expr_listContext.class,0);
		}
		public Expression_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression_list; }
	}

	public final Expression_listContext expression_list() throws RecognitionException {
		Expression_listContext _localctx = new Expression_listContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_expression_list);
		try {
			setState(112);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				}
				break;
			case T__0:
			case T__2:
			case T__3:
			case T__6:
			case T__14:
			case T__16:
			case T__18:
			case T__21:
			case T__22:
			case T__23:
			case SIGNED_INT:
			case NUMBER:
			case FUNCTIONS:
			case RAW_STRING:
			case JSON_CONSTANT:
			case NAME:
			case STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(111);
				nonempty_expr_list(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Parm_separatorContext extends ParserRuleContext {
		public Parm_separatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parm_separator; }
	}

	public final Parm_separatorContext parm_separator() throws RecognitionException {
		Parm_separatorContext _localctx = new Parm_separatorContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_parm_separator);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(114);
			match(T__10);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class JmesPathExpressionContext extends ParserRuleContext {
		public JmesPathExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jmesPathExpression; }
	 
		public JmesPathExpressionContext() { }
		public void copyFrom(JmesPathExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class PipeExpressionContext extends JmesPathExpressionContext {
		public List<JmesPathExpressionContext> jmesPathExpression() {
			return getRuleContexts(JmesPathExpressionContext.class);
		}
		public JmesPathExpressionContext jmesPathExpression(int i) {
			return getRuleContext(JmesPathExpressionContext.class,i);
		}
		public PipeExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class IdentifierExpressionContext extends JmesPathExpressionContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public IdentifierExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class NotExpressionContext extends JmesPathExpressionContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public NotExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class RawStringExpressionContext extends JmesPathExpressionContext {
		public TerminalNode RAW_STRING() { return getToken(JSONFormulaParser.RAW_STRING, 0); }
		public RawStringExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ComparisonExpressionContext extends JmesPathExpressionContext {
		public List<JmesPathExpressionContext> jmesPathExpression() {
			return getRuleContexts(JmesPathExpressionContext.class);
		}
		public JmesPathExpressionContext jmesPathExpression(int i) {
			return getRuleContext(JmesPathExpressionContext.class,i);
		}
		public TerminalNode COMPARATOR() { return getToken(JSONFormulaParser.COMPARATOR, 0); }
		public ComparisonExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ParenExpressionContext extends JmesPathExpressionContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public ParenExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BracketExpressionContext extends JmesPathExpressionContext {
		public BracketSpecifierContext bracketSpecifier() {
			return getRuleContext(BracketSpecifierContext.class,0);
		}
		public BracketExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class OrExpressionContext extends JmesPathExpressionContext {
		public List<JmesPathExpressionContext> jmesPathExpression() {
			return getRuleContexts(JmesPathExpressionContext.class);
		}
		public JmesPathExpressionContext jmesPathExpression(int i) {
			return getRuleContext(JmesPathExpressionContext.class,i);
		}
		public OrExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class CurrentNodeExpressionContext extends JmesPathExpressionContext {
		public CurrentNodeContext currentNode() {
			return getRuleContext(CurrentNodeContext.class,0);
		}
		public CurrentNodeExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ChainExpressionContext extends JmesPathExpressionContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public ChainedExpressionContext chainedExpression() {
			return getRuleContext(ChainedExpressionContext.class,0);
		}
		public ChainExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class AndExpressionContext extends JmesPathExpressionContext {
		public List<JmesPathExpressionContext> jmesPathExpression() {
			return getRuleContexts(JmesPathExpressionContext.class);
		}
		public JmesPathExpressionContext jmesPathExpression(int i) {
			return getRuleContext(JmesPathExpressionContext.class,i);
		}
		public AndExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MultiSelectHashExpressionContext extends JmesPathExpressionContext {
		public MultiSelectHashContext multiSelectHash() {
			return getRuleContext(MultiSelectHashContext.class,0);
		}
		public MultiSelectHashExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class WildcardExpressionContext extends JmesPathExpressionContext {
		public WildcardContext wildcard() {
			return getRuleContext(WildcardContext.class,0);
		}
		public WildcardExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class FunctionCallExpressionContext extends JmesPathExpressionContext {
		public FunctionExpressionContext functionExpression() {
			return getRuleContext(FunctionExpressionContext.class,0);
		}
		public FunctionCallExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MultiSelectListExpressionContext extends JmesPathExpressionContext {
		public MultiSelectListContext multiSelectList() {
			return getRuleContext(MultiSelectListContext.class,0);
		}
		public MultiSelectListExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BracketedExpressionContext extends JmesPathExpressionContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public BracketSpecifierContext bracketSpecifier() {
			return getRuleContext(BracketSpecifierContext.class,0);
		}
		public BracketedExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class LiteralExpressionContext extends JmesPathExpressionContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public LiteralExpressionContext(JmesPathExpressionContext ctx) { copyFrom(ctx); }
	}

	public final JmesPathExpressionContext jmesPathExpression() throws RecognitionException {
		return jmesPathExpression(0);
	}

	private JmesPathExpressionContext jmesPathExpression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		JmesPathExpressionContext _localctx = new JmesPathExpressionContext(_ctx, _parentState);
		JmesPathExpressionContext _prevctx = _localctx;
		int _startState = 20;
		enterRecursionRule(_localctx, 20, RULE_jmesPathExpression, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(132);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				_localctx = new BracketExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(117);
				bracketSpecifier();
				}
				break;
			case 2:
				{
				_localctx = new IdentifierExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(118);
				identifier();
				}
				break;
			case 3:
				{
				_localctx = new NotExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(119);
				match(T__14);
				setState(120);
				jmesPathExpression(10);
				}
				break;
			case 4:
				{
				_localctx = new ParenExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(121);
				match(T__0);
				setState(122);
				jmesPathExpression(0);
				setState(123);
				match(T__1);
				}
				break;
			case 5:
				{
				_localctx = new WildcardExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(125);
				wildcard();
				}
				break;
			case 6:
				{
				_localctx = new MultiSelectListExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(126);
				multiSelectList();
				}
				break;
			case 7:
				{
				_localctx = new MultiSelectHashExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(127);
				multiSelectHash();
				}
				break;
			case 8:
				{
				_localctx = new LiteralExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(128);
				literal();
				}
				break;
			case 9:
				{
				_localctx = new FunctionCallExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(129);
				functionExpression();
				}
				break;
			case 10:
				{
				_localctx = new RawStringExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(130);
				match(RAW_STRING);
				}
				break;
			case 11:
				{
				_localctx = new CurrentNodeExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(131);
				currentNode();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(153);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(151);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
					case 1:
						{
						_localctx = new ComparisonExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(134);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(135);
						match(COMPARATOR);
						setState(136);
						jmesPathExpression(15);
						}
						break;
					case 2:
						{
						_localctx = new AndExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(137);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(138);
						match(T__12);
						setState(139);
						jmesPathExpression(14);
						}
						break;
					case 3:
						{
						_localctx = new OrExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(140);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(141);
						match(T__13);
						setState(142);
						jmesPathExpression(13);
						}
						break;
					case 4:
						{
						_localctx = new PipeExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(143);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(144);
						match(T__15);
						setState(145);
						jmesPathExpression(4);
						}
						break;
					case 5:
						{
						_localctx = new ChainExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(146);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(147);
						match(T__11);
						setState(148);
						chainedExpression();
						}
						break;
					case 6:
						{
						_localctx = new BracketedExpressionContext(new JmesPathExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_jmesPathExpression);
						setState(149);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(150);
						bracketSpecifier();
						}
						break;
					}
					} 
				}
				setState(155);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class ChainedExpressionContext extends ParserRuleContext {
		public ChainedExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chainedExpression; }
	 
		public ChainedExpressionContext() { }
		public void copyFrom(ChainedExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ChainedMultiSelectListContext extends ChainedExpressionContext {
		public MultiSelectListContext multiSelectList() {
			return getRuleContext(MultiSelectListContext.class,0);
		}
		public ChainedMultiSelectListContext(ChainedExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ChainedWildcardContext extends ChainedExpressionContext {
		public WildcardContext wildcard() {
			return getRuleContext(WildcardContext.class,0);
		}
		public ChainedWildcardContext(ChainedExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ChainedMultiSelectHashContext extends ChainedExpressionContext {
		public MultiSelectHashContext multiSelectHash() {
			return getRuleContext(MultiSelectHashContext.class,0);
		}
		public ChainedMultiSelectHashContext(ChainedExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ChainedIdentifierContext extends ChainedExpressionContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ChainedIdentifierContext(ChainedExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ChainedFunctionExpressionContext extends ChainedExpressionContext {
		public FunctionExpressionContext functionExpression() {
			return getRuleContext(FunctionExpressionContext.class,0);
		}
		public ChainedFunctionExpressionContext(ChainedExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ChainedExpressionContext chainedExpression() throws RecognitionException {
		ChainedExpressionContext _localctx = new ChainedExpressionContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_chainedExpression);
		try {
			setState(161);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				_localctx = new ChainedIdentifierContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(156);
				identifier();
				}
				break;
			case 2:
				_localctx = new ChainedMultiSelectListContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(157);
				multiSelectList();
				}
				break;
			case 3:
				_localctx = new ChainedMultiSelectHashContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(158);
				multiSelectHash();
				}
				break;
			case 4:
				_localctx = new ChainedFunctionExpressionContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(159);
				functionExpression();
				}
				break;
			case 5:
				_localctx = new ChainedWildcardContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(160);
				wildcard();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WildcardContext extends ParserRuleContext {
		public WildcardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_wildcard; }
	}

	public final WildcardContext wildcard() throws RecognitionException {
		WildcardContext _localctx = new WildcardContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_wildcard);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(163);
			match(T__6);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MultiSelectListContext extends ParserRuleContext {
		public List<JmesPathExpressionContext> jmesPathExpression() {
			return getRuleContexts(JmesPathExpressionContext.class);
		}
		public JmesPathExpressionContext jmesPathExpression(int i) {
			return getRuleContext(JmesPathExpressionContext.class,i);
		}
		public MultiSelectListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_multiSelectList; }
	}

	public final MultiSelectListContext multiSelectList() throws RecognitionException {
		MultiSelectListContext _localctx = new MultiSelectListContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_multiSelectList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(165);
			match(T__16);
			setState(166);
			jmesPathExpression(0);
			setState(171);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__10) {
				{
				{
				setState(167);
				match(T__10);
				setState(168);
				jmesPathExpression(0);
				}
				}
				setState(173);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(174);
			match(T__17);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MultiSelectHashContext extends ParserRuleContext {
		public List<KeyvalExprContext> keyvalExpr() {
			return getRuleContexts(KeyvalExprContext.class);
		}
		public KeyvalExprContext keyvalExpr(int i) {
			return getRuleContext(KeyvalExprContext.class,i);
		}
		public MultiSelectHashContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_multiSelectHash; }
	}

	public final MultiSelectHashContext multiSelectHash() throws RecognitionException {
		MultiSelectHashContext _localctx = new MultiSelectHashContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_multiSelectHash);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(176);
			match(T__18);
			setState(177);
			keyvalExpr();
			setState(182);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__10) {
				{
				{
				setState(178);
				match(T__10);
				setState(179);
				keyvalExpr();
				}
				}
				setState(184);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(185);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class KeyvalExprContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public KeyvalExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_keyvalExpr; }
	}

	public final KeyvalExprContext keyvalExpr() throws RecognitionException {
		KeyvalExprContext _localctx = new KeyvalExprContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_keyvalExpr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(187);
			identifier();
			setState(188);
			match(T__20);
			setState(189);
			jmesPathExpression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BracketSpecifierContext extends ParserRuleContext {
		public BracketSpecifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracketSpecifier; }
	 
		public BracketSpecifierContext() { }
		public void copyFrom(BracketSpecifierContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class SelectContext extends BracketSpecifierContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public SelectContext(BracketSpecifierContext ctx) { copyFrom(ctx); }
	}
	public static class BracketFlattenContext extends BracketSpecifierContext {
		public BracketFlattenContext(BracketSpecifierContext ctx) { copyFrom(ctx); }
	}
	public static class BracketSliceContext extends BracketSpecifierContext {
		public SliceContext slice() {
			return getRuleContext(SliceContext.class,0);
		}
		public BracketSliceContext(BracketSpecifierContext ctx) { copyFrom(ctx); }
	}
	public static class BracketIndexContext extends BracketSpecifierContext {
		public TerminalNode SIGNED_INT() { return getToken(JSONFormulaParser.SIGNED_INT, 0); }
		public BracketIndexContext(BracketSpecifierContext ctx) { copyFrom(ctx); }
	}
	public static class BracketStarContext extends BracketSpecifierContext {
		public BracketStarContext(BracketSpecifierContext ctx) { copyFrom(ctx); }
	}

	public final BracketSpecifierContext bracketSpecifier() throws RecognitionException {
		BracketSpecifierContext _localctx = new BracketSpecifierContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_bracketSpecifier);
		try {
			setState(207);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				_localctx = new BracketIndexContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(191);
				match(T__16);
				setState(192);
				match(SIGNED_INT);
				setState(193);
				match(T__17);
				}
				break;
			case 2:
				_localctx = new BracketStarContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(194);
				match(T__16);
				setState(195);
				match(T__6);
				setState(196);
				match(T__17);
				}
				break;
			case 3:
				_localctx = new BracketSliceContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(197);
				match(T__16);
				setState(198);
				slice();
				setState(199);
				match(T__17);
				}
				break;
			case 4:
				_localctx = new BracketFlattenContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(201);
				match(T__16);
				setState(202);
				match(T__17);
				}
				break;
			case 5:
				_localctx = new SelectContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(203);
				match(T__21);
				setState(204);
				jmesPathExpression(0);
				setState(205);
				match(T__17);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SliceContext extends ParserRuleContext {
		public Token start;
		public Token stop;
		public Token step;
		public List<TerminalNode> SIGNED_INT() { return getTokens(JSONFormulaParser.SIGNED_INT); }
		public TerminalNode SIGNED_INT(int i) {
			return getToken(JSONFormulaParser.SIGNED_INT, i);
		}
		public SliceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_slice; }
	}

	public final SliceContext slice() throws RecognitionException {
		SliceContext _localctx = new SliceContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_slice);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(210);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SIGNED_INT) {
				{
				setState(209);
				((SliceContext)_localctx).start = match(SIGNED_INT);
				}
			}

			setState(212);
			match(T__20);
			setState(214);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SIGNED_INT) {
				{
				setState(213);
				((SliceContext)_localctx).stop = match(SIGNED_INT);
				}
			}

			setState(220);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__20) {
				{
				setState(216);
				match(T__20);
				setState(218);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SIGNED_INT) {
					{
					setState(217);
					((SliceContext)_localctx).step = match(SIGNED_INT);
					}
				}

				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionExpressionContext extends ParserRuleContext {
		public TerminalNode NAME() { return getToken(JSONFormulaParser.NAME, 0); }
		public List<FunctionArgContext> functionArg() {
			return getRuleContexts(FunctionArgContext.class);
		}
		public FunctionArgContext functionArg(int i) {
			return getRuleContext(FunctionArgContext.class,i);
		}
		public FunctionExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionExpression; }
	}

	public final FunctionExpressionContext functionExpression() throws RecognitionException {
		FunctionExpressionContext _localctx = new FunctionExpressionContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_functionExpression);
		int _la;
		try {
			setState(237);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(222);
				match(NAME);
				setState(223);
				match(T__0);
				setState(224);
				functionArg();
				setState(229);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__10) {
					{
					{
					setState(225);
					match(T__10);
					setState(226);
					functionArg();
					}
					}
					setState(231);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(232);
				match(T__1);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(234);
				match(NAME);
				setState(235);
				match(T__0);
				setState(236);
				match(T__1);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionArgContext extends ParserRuleContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public ExpressionTypeContext expressionType() {
			return getRuleContext(ExpressionTypeContext.class,0);
		}
		public FunctionArgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionArg; }
	}

	public final FunctionArgContext functionArg() throws RecognitionException {
		FunctionArgContext _localctx = new FunctionArgContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_functionArg);
		try {
			setState(241);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
			case T__6:
			case T__14:
			case T__16:
			case T__18:
			case T__21:
			case T__22:
			case T__23:
			case RAW_STRING:
			case JSON_CONSTANT:
			case NAME:
			case STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(239);
				jmesPathExpression(0);
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 2);
				{
				setState(240);
				expressionType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CurrentNodeContext extends ParserRuleContext {
		public CurrentNodeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_currentNode; }
	}

	public final CurrentNodeContext currentNode() throws RecognitionException {
		CurrentNodeContext _localctx = new CurrentNodeContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_currentNode);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(243);
			match(T__22);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionTypeContext extends ParserRuleContext {
		public JmesPathExpressionContext jmesPathExpression() {
			return getRuleContext(JmesPathExpressionContext.class,0);
		}
		public ExpressionTypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionType; }
	}

	public final ExpressionTypeContext expressionType() throws RecognitionException {
		ExpressionTypeContext _localctx = new ExpressionTypeContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_expressionType);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(245);
			match(T__5);
			setState(246);
			jmesPathExpression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LiteralContext extends ParserRuleContext {
		public JsonValueContext jsonValue() {
			return getRuleContext(JsonValueContext.class,0);
		}
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_literal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(248);
			match(T__23);
			setState(249);
			jsonValue();
			setState(250);
			match(T__23);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public TerminalNode NAME() { return getToken(JSONFormulaParser.NAME, 0); }
		public TerminalNode STRING() { return getToken(JSONFormulaParser.STRING, 0); }
		public TerminalNode JSON_CONSTANT() { return getToken(JSONFormulaParser.JSON_CONSTANT, 0); }
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_identifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(252);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << JSON_CONSTANT) | (1L << NAME) | (1L << STRING))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class JsonObjectContext extends ParserRuleContext {
		public List<JsonObjectPairContext> jsonObjectPair() {
			return getRuleContexts(JsonObjectPairContext.class);
		}
		public JsonObjectPairContext jsonObjectPair(int i) {
			return getRuleContext(JsonObjectPairContext.class,i);
		}
		public JsonObjectContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jsonObject; }
	}

	public final JsonObjectContext jsonObject() throws RecognitionException {
		JsonObjectContext _localctx = new JsonObjectContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_jsonObject);
		int _la;
		try {
			setState(267);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,20,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(254);
				match(T__18);
				setState(255);
				jsonObjectPair();
				setState(260);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__10) {
					{
					{
					setState(256);
					match(T__10);
					setState(257);
					jsonObjectPair();
					}
					}
					setState(262);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(263);
				match(T__19);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(265);
				match(T__18);
				setState(266);
				match(T__19);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class JsonObjectPairContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(JSONFormulaParser.STRING, 0); }
		public JsonValueContext jsonValue() {
			return getRuleContext(JsonValueContext.class,0);
		}
		public JsonObjectPairContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jsonObjectPair; }
	}

	public final JsonObjectPairContext jsonObjectPair() throws RecognitionException {
		JsonObjectPairContext _localctx = new JsonObjectPairContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_jsonObjectPair);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(269);
			match(STRING);
			setState(270);
			match(T__20);
			setState(271);
			jsonValue();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class JsonArrayContext extends ParserRuleContext {
		public List<JsonValueContext> jsonValue() {
			return getRuleContexts(JsonValueContext.class);
		}
		public JsonValueContext jsonValue(int i) {
			return getRuleContext(JsonValueContext.class,i);
		}
		public JsonArrayContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jsonArray; }
	}

	public final JsonArrayContext jsonArray() throws RecognitionException {
		JsonArrayContext _localctx = new JsonArrayContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_jsonArray);
		int _la;
		try {
			setState(286);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,22,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(273);
				match(T__16);
				setState(274);
				jsonValue();
				setState(279);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__10) {
					{
					{
					setState(275);
					match(T__10);
					setState(276);
					jsonValue();
					}
					}
					setState(281);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(282);
				match(T__17);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(284);
				match(T__16);
				setState(285);
				match(T__17);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class JsonValueContext extends ParserRuleContext {
		public JsonValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jsonValue; }
	 
		public JsonValueContext() { }
		public void copyFrom(JsonValueContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class JsonArrayValueContext extends JsonValueContext {
		public JsonArrayContext jsonArray() {
			return getRuleContext(JsonArrayContext.class,0);
		}
		public JsonArrayValueContext(JsonValueContext ctx) { copyFrom(ctx); }
	}
	public static class JsonStringValueContext extends JsonValueContext {
		public TerminalNode STRING() { return getToken(JSONFormulaParser.STRING, 0); }
		public JsonStringValueContext(JsonValueContext ctx) { copyFrom(ctx); }
	}
	public static class JsonObjectValueContext extends JsonValueContext {
		public JsonObjectContext jsonObject() {
			return getRuleContext(JsonObjectContext.class,0);
		}
		public JsonObjectValueContext(JsonValueContext ctx) { copyFrom(ctx); }
	}
	public static class JsonConstantValueContext extends JsonValueContext {
		public TerminalNode JSON_CONSTANT() { return getToken(JSONFormulaParser.JSON_CONSTANT, 0); }
		public JsonConstantValueContext(JsonValueContext ctx) { copyFrom(ctx); }
	}
	public static class JsonNumberValueContext extends JsonValueContext {
		public TerminalNode REAL_OR_EXPONENT_NUMBER() { return getToken(JSONFormulaParser.REAL_OR_EXPONENT_NUMBER, 0); }
		public TerminalNode SIGNED_INT() { return getToken(JSONFormulaParser.SIGNED_INT, 0); }
		public JsonNumberValueContext(JsonValueContext ctx) { copyFrom(ctx); }
	}

	public final JsonValueContext jsonValue() throws RecognitionException {
		JsonValueContext _localctx = new JsonValueContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_jsonValue);
		int _la;
		try {
			setState(293);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING:
				_localctx = new JsonStringValueContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(288);
				match(STRING);
				}
				break;
			case SIGNED_INT:
			case REAL_OR_EXPONENT_NUMBER:
				_localctx = new JsonNumberValueContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(289);
				_la = _input.LA(1);
				if ( !(_la==SIGNED_INT || _la==REAL_OR_EXPONENT_NUMBER) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case T__18:
				_localctx = new JsonObjectValueContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(290);
				jsonObject();
				}
				break;
			case T__16:
				_localctx = new JsonArrayValueContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(291);
				jsonArray();
				}
				break;
			case JSON_CONSTANT:
				_localctx = new JsonConstantValueContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(292);
				match(JSON_CONSTANT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 1:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		case 7:
			return nonempty_expr_list_sempred((Nonempty_expr_listContext)_localctx, predIndex);
		case 10:
			return jmesPathExpression_sempred((JmesPathExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 6);
		case 1:
			return precpred(_ctx, 4);
		}
		return true;
	}
	private boolean nonempty_expr_list_sempred(Nonempty_expr_listContext _localctx, int predIndex) {
		switch (predIndex) {
		case 2:
			return precpred(_ctx, 1);
		}
		return true;
	}
	private boolean jmesPathExpression_sempred(JmesPathExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 3:
			return precpred(_ctx, 14);
		case 4:
			return precpred(_ctx, 13);
		case 5:
			return precpred(_ctx, 12);
		case 6:
			return precpred(_ctx, 3);
		case 7:
			return precpred(_ctx, 17);
		case 8:
			return precpred(_ctx, 16);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3$\u012a\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3K\n\3\3\3\3\3\3\3\3\3\3\3\3\3\7"+
		"\3S\n\3\f\3\16\3V\13\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\7\3\7\3\7\3\b"+
		"\3\b\3\t\3\t\3\t\3\t\3\t\3\t\3\t\7\tl\n\t\f\t\16\to\13\t\3\n\3\n\5\ns"+
		"\n\n\3\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f"+
		"\3\f\3\f\5\f\u0087\n\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\3\f\3\f\7\f\u009a\n\f\f\f\16\f\u009d\13\f\3\r\3\r\3\r\3\r"+
		"\3\r\5\r\u00a4\n\r\3\16\3\16\3\17\3\17\3\17\3\17\7\17\u00ac\n\17\f\17"+
		"\16\17\u00af\13\17\3\17\3\17\3\20\3\20\3\20\3\20\7\20\u00b7\n\20\f\20"+
		"\16\20\u00ba\13\20\3\20\3\20\3\21\3\21\3\21\3\21\3\22\3\22\3\22\3\22\3"+
		"\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\5\22\u00d2"+
		"\n\22\3\23\5\23\u00d5\n\23\3\23\3\23\5\23\u00d9\n\23\3\23\3\23\5\23\u00dd"+
		"\n\23\5\23\u00df\n\23\3\24\3\24\3\24\3\24\3\24\7\24\u00e6\n\24\f\24\16"+
		"\24\u00e9\13\24\3\24\3\24\3\24\3\24\3\24\5\24\u00f0\n\24\3\25\3\25\5\25"+
		"\u00f4\n\25\3\26\3\26\3\27\3\27\3\27\3\30\3\30\3\30\3\30\3\31\3\31\3\32"+
		"\3\32\3\32\3\32\7\32\u0105\n\32\f\32\16\32\u0108\13\32\3\32\3\32\3\32"+
		"\3\32\5\32\u010e\n\32\3\33\3\33\3\33\3\33\3\34\3\34\3\34\3\34\7\34\u0118"+
		"\n\34\f\34\16\34\u011b\13\34\3\34\3\34\3\34\3\34\5\34\u0121\n\34\3\35"+
		"\3\35\3\35\3\35\3\35\5\35\u0128\n\35\3\35\2\5\4\20\26\36\2\4\6\b\n\f\16"+
		"\20\22\24\26\30\32\34\36 \"$&(*,.\60\62\64\668\2\6\3\2\5\6\4\2\5\13\36"+
		"\36\3\2 \"\4\2\33\33##\2\u0140\2:\3\2\2\2\4J\3\2\2\2\6W\3\2\2\2\bY\3\2"+
		"\2\2\n[\3\2\2\2\f]\3\2\2\2\16b\3\2\2\2\20d\3\2\2\2\22r\3\2\2\2\24t\3\2"+
		"\2\2\26\u0086\3\2\2\2\30\u00a3\3\2\2\2\32\u00a5\3\2\2\2\34\u00a7\3\2\2"+
		"\2\36\u00b2\3\2\2\2 \u00bd\3\2\2\2\"\u00d1\3\2\2\2$\u00d4\3\2\2\2&\u00ef"+
		"\3\2\2\2(\u00f3\3\2\2\2*\u00f5\3\2\2\2,\u00f7\3\2\2\2.\u00fa\3\2\2\2\60"+
		"\u00fe\3\2\2\2\62\u010d\3\2\2\2\64\u010f\3\2\2\2\66\u0120\3\2\2\28\u0127"+
		"\3\2\2\2:;\5\4\3\2;<\7\2\2\3<\3\3\2\2\2=>\b\3\1\2>K\7\33\2\2?K\7\34\2"+
		"\2@K\7\37\2\2AB\5\6\4\2BC\5\4\3\7CK\3\2\2\2DE\7\3\2\2EF\5\4\3\2FG\7\4"+
		"\2\2GK\3\2\2\2HK\5\f\7\2IK\5\26\f\2J=\3\2\2\2J?\3\2\2\2J@\3\2\2\2JA\3"+
		"\2\2\2JD\3\2\2\2JH\3\2\2\2JI\3\2\2\2KT\3\2\2\2LM\f\b\2\2MN\5\b\5\2NO\5"+
		"\4\3\tOS\3\2\2\2PQ\f\6\2\2QS\5\n\6\2RL\3\2\2\2RP\3\2\2\2SV\3\2\2\2TR\3"+
		"\2\2\2TU\3\2\2\2U\5\3\2\2\2VT\3\2\2\2WX\t\2\2\2X\7\3\2\2\2YZ\t\3\2\2Z"+
		"\t\3\2\2\2[\\\7\f\2\2\\\13\3\2\2\2]^\7\35\2\2^_\7\3\2\2_`\5\22\n\2`a\7"+
		"\4\2\2a\r\3\2\2\2bc\5\4\3\2c\17\3\2\2\2de\b\t\1\2ef\5\16\b\2fm\3\2\2\2"+
		"gh\f\3\2\2hi\5\24\13\2ij\5\16\b\2jl\3\2\2\2kg\3\2\2\2lo\3\2\2\2mk\3\2"+
		"\2\2mn\3\2\2\2n\21\3\2\2\2om\3\2\2\2ps\3\2\2\2qs\5\20\t\2rp\3\2\2\2rq"+
		"\3\2\2\2s\23\3\2\2\2tu\7\r\2\2u\25\3\2\2\2vw\b\f\1\2w\u0087\5\"\22\2x"+
		"\u0087\5\60\31\2yz\7\21\2\2z\u0087\5\26\f\f{|\7\3\2\2|}\5\26\f\2}~\7\4"+
		"\2\2~\u0087\3\2\2\2\177\u0087\5\32\16\2\u0080\u0087\5\34\17\2\u0081\u0087"+
		"\5\36\20\2\u0082\u0087\5.\30\2\u0083\u0087\5&\24\2\u0084\u0087\7\37\2"+
		"\2\u0085\u0087\5*\26\2\u0086v\3\2\2\2\u0086x\3\2\2\2\u0086y\3\2\2\2\u0086"+
		"{\3\2\2\2\u0086\177\3\2\2\2\u0086\u0080\3\2\2\2\u0086\u0081\3\2\2\2\u0086"+
		"\u0082\3\2\2\2\u0086\u0083\3\2\2\2\u0086\u0084\3\2\2\2\u0086\u0085\3\2"+
		"\2\2\u0087\u009b\3\2\2\2\u0088\u0089\f\20\2\2\u0089\u008a\7\36\2\2\u008a"+
		"\u009a\5\26\f\21\u008b\u008c\f\17\2\2\u008c\u008d\7\17\2\2\u008d\u009a"+
		"\5\26\f\20\u008e\u008f\f\16\2\2\u008f\u0090\7\20\2\2\u0090\u009a\5\26"+
		"\f\17\u0091\u0092\f\5\2\2\u0092\u0093\7\22\2\2\u0093\u009a\5\26\f\6\u0094"+
		"\u0095\f\23\2\2\u0095\u0096\7\16\2\2\u0096\u009a\5\30\r\2\u0097\u0098"+
		"\f\22\2\2\u0098\u009a\5\"\22\2\u0099\u0088\3\2\2\2\u0099\u008b\3\2\2\2"+
		"\u0099\u008e\3\2\2\2\u0099\u0091\3\2\2\2\u0099\u0094\3\2\2\2\u0099\u0097"+
		"\3\2\2\2\u009a\u009d\3\2\2\2\u009b\u0099\3\2\2\2\u009b\u009c\3\2\2\2\u009c"+
		"\27\3\2\2\2\u009d\u009b\3\2\2\2\u009e\u00a4\5\60\31\2\u009f\u00a4\5\34"+
		"\17\2\u00a0\u00a4\5\36\20\2\u00a1\u00a4\5&\24\2\u00a2\u00a4\5\32\16\2"+
		"\u00a3\u009e\3\2\2\2\u00a3\u009f\3\2\2\2\u00a3\u00a0\3\2\2\2\u00a3\u00a1"+
		"\3\2\2\2\u00a3\u00a2\3\2\2\2\u00a4\31\3\2\2\2\u00a5\u00a6\7\t\2\2\u00a6"+
		"\33\3\2\2\2\u00a7\u00a8\7\23\2\2\u00a8\u00ad\5\26\f\2\u00a9\u00aa\7\r"+
		"\2\2\u00aa\u00ac\5\26\f\2\u00ab\u00a9\3\2\2\2\u00ac\u00af\3\2\2\2\u00ad"+
		"\u00ab\3\2\2\2\u00ad\u00ae\3\2\2\2\u00ae\u00b0\3\2\2\2\u00af\u00ad\3\2"+
		"\2\2\u00b0\u00b1\7\24\2\2\u00b1\35\3\2\2\2\u00b2\u00b3\7\25\2\2\u00b3"+
		"\u00b8\5 \21\2\u00b4\u00b5\7\r\2\2\u00b5\u00b7\5 \21\2\u00b6\u00b4\3\2"+
		"\2\2\u00b7\u00ba\3\2\2\2\u00b8\u00b6\3\2\2\2\u00b8\u00b9\3\2\2\2\u00b9"+
		"\u00bb\3\2\2\2\u00ba\u00b8\3\2\2\2\u00bb\u00bc\7\26\2\2\u00bc\37\3\2\2"+
		"\2\u00bd\u00be\5\60\31\2\u00be\u00bf\7\27\2\2\u00bf\u00c0\5\26\f\2\u00c0"+
		"!\3\2\2\2\u00c1\u00c2\7\23\2\2\u00c2\u00c3\7\33\2\2\u00c3\u00d2\7\24\2"+
		"\2\u00c4\u00c5\7\23\2\2\u00c5\u00c6\7\t\2\2\u00c6\u00d2\7\24\2\2\u00c7"+
		"\u00c8\7\23\2\2\u00c8\u00c9\5$\23\2\u00c9\u00ca\7\24\2\2\u00ca\u00d2\3"+
		"\2\2\2\u00cb\u00cc\7\23\2\2\u00cc\u00d2\7\24\2\2\u00cd\u00ce\7\30\2\2"+
		"\u00ce\u00cf\5\26\f\2\u00cf\u00d0\7\24\2\2\u00d0\u00d2\3\2\2\2\u00d1\u00c1"+
		"\3\2\2\2\u00d1\u00c4\3\2\2\2\u00d1\u00c7\3\2\2\2\u00d1\u00cb\3\2\2\2\u00d1"+
		"\u00cd\3\2\2\2\u00d2#\3\2\2\2\u00d3\u00d5\7\33\2\2\u00d4\u00d3\3\2\2\2"+
		"\u00d4\u00d5\3\2\2\2\u00d5\u00d6\3\2\2\2\u00d6\u00d8\7\27\2\2\u00d7\u00d9"+
		"\7\33\2\2\u00d8\u00d7\3\2\2\2\u00d8\u00d9\3\2\2\2\u00d9\u00de\3\2\2\2"+
		"\u00da\u00dc\7\27\2\2\u00db\u00dd\7\33\2\2\u00dc\u00db\3\2\2\2\u00dc\u00dd"+
		"\3\2\2\2\u00dd\u00df\3\2\2\2\u00de\u00da\3\2\2\2\u00de\u00df\3\2\2\2\u00df"+
		"%\3\2\2\2\u00e0\u00e1\7!\2\2\u00e1\u00e2\7\3\2\2\u00e2\u00e7\5(\25\2\u00e3"+
		"\u00e4\7\r\2\2\u00e4\u00e6\5(\25\2\u00e5\u00e3\3\2\2\2\u00e6\u00e9\3\2"+
		"\2\2\u00e7\u00e5\3\2\2\2\u00e7\u00e8\3\2\2\2\u00e8\u00ea\3\2\2\2\u00e9"+
		"\u00e7\3\2\2\2\u00ea\u00eb\7\4\2\2\u00eb\u00f0\3\2\2\2\u00ec\u00ed\7!"+
		"\2\2\u00ed\u00ee\7\3\2\2\u00ee\u00f0\7\4\2\2\u00ef\u00e0\3\2\2\2\u00ef"+
		"\u00ec\3\2\2\2\u00f0\'\3\2\2\2\u00f1\u00f4\5\26\f\2\u00f2\u00f4\5,\27"+
		"\2\u00f3\u00f1\3\2\2\2\u00f3\u00f2\3\2\2\2\u00f4)\3\2\2\2\u00f5\u00f6"+
		"\7\31\2\2\u00f6+\3\2\2\2\u00f7\u00f8\7\b\2\2\u00f8\u00f9\5\26\f\2\u00f9"+
		"-\3\2\2\2\u00fa\u00fb\7\32\2\2\u00fb\u00fc\58\35\2\u00fc\u00fd\7\32\2"+
		"\2\u00fd/\3\2\2\2\u00fe\u00ff\t\4\2\2\u00ff\61\3\2\2\2\u0100\u0101\7\25"+
		"\2\2\u0101\u0106\5\64\33\2\u0102\u0103\7\r\2\2\u0103\u0105\5\64\33\2\u0104"+
		"\u0102\3\2\2\2\u0105\u0108\3\2\2\2\u0106\u0104\3\2\2\2\u0106\u0107\3\2"+
		"\2\2\u0107\u0109\3\2\2\2\u0108\u0106\3\2\2\2\u0109\u010a\7\26\2\2\u010a"+
		"\u010e\3\2\2\2\u010b\u010c\7\25\2\2\u010c\u010e\7\26\2\2\u010d\u0100\3"+
		"\2\2\2\u010d\u010b\3\2\2\2\u010e\63\3\2\2\2\u010f\u0110\7\"\2\2\u0110"+
		"\u0111\7\27\2\2\u0111\u0112\58\35\2\u0112\65\3\2\2\2\u0113\u0114\7\23"+
		"\2\2\u0114\u0119\58\35\2\u0115\u0116\7\r\2\2\u0116\u0118\58\35\2\u0117"+
		"\u0115\3\2\2\2\u0118\u011b\3\2\2\2\u0119\u0117\3\2\2\2\u0119\u011a\3\2"+
		"\2\2\u011a\u011c\3\2\2\2\u011b\u0119\3\2\2\2\u011c\u011d\7\24\2\2\u011d"+
		"\u0121\3\2\2\2\u011e\u011f\7\23\2\2\u011f\u0121\7\24\2\2\u0120\u0113\3"+
		"\2\2\2\u0120\u011e\3\2\2\2\u0121\67\3\2\2\2\u0122\u0128\7\"\2\2\u0123"+
		"\u0128\t\5\2\2\u0124\u0128\5\62\32\2\u0125\u0128\5\66\34\2\u0126\u0128"+
		"\7 \2\2\u0127\u0122\3\2\2\2\u0127\u0123\3\2\2\2\u0127\u0124\3\2\2\2\u0127"+
		"\u0125\3\2\2\2\u0127\u0126\3\2\2\2\u01289\3\2\2\2\32JRTmr\u0086\u0099"+
		"\u009b\u00a3\u00ad\u00b8\u00d1\u00d4\u00d8\u00dc\u00de\u00e7\u00ef\u00f3"+
		"\u0106\u010d\u0119\u0120\u0127";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}
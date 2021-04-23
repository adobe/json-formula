// Generated from /Users/johnbrinkman/dev/json-formula/antlr/JSONFormula.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class JSONFormulaLexer extends Lexer {
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
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
			"T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "SIGNED_INT", 
			"NUMBER", "BOOLEANS", "FUNCTIONS", "COMPARATOR", "RAW_STRING", "RAW_ESC", 
			"JSON_CONSTANT", "NAME", "STRING", "ESC", "UNICODE", "HEX", "REAL_OR_EXPONENT_NUMBER", 
			"INT", "EXP", "WS"
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


	public JSONFormulaLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "JSONFormula.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2$\u0115\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\3\2\3\2"+
		"\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\n\3\n\3"+
		"\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\16\3\17\3\17\3\17\3\20\3\20\3\21"+
		"\3\21\3\22\3\22\3\23\3\23\3\24\3\24\3\25\3\25\3\26\3\26\3\27\3\27\3\27"+
		"\3\30\3\30\3\31\3\31\3\32\5\32\u008b\n\32\3\32\3\32\3\33\3\33\5\33\u0091"+
		"\n\33\3\33\7\33\u0094\n\33\f\33\16\33\u0097\13\33\3\34\3\34\3\34\3\34"+
		"\3\34\3\34\3\34\3\34\3\34\5\34\u00a2\n\34\3\35\3\35\3\35\3\35\3\35\3\35"+
		"\5\35\u00aa\n\35\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\5\36"+
		"\u00b6\n\36\3\37\3\37\3\37\7\37\u00bb\n\37\f\37\16\37\u00be\13\37\3\37"+
		"\3\37\3 \3 \3 \3!\3!\3!\3!\3!\5!\u00ca\n!\3\"\3\"\7\"\u00ce\n\"\f\"\16"+
		"\"\u00d1\13\"\3#\3#\3#\7#\u00d6\n#\f#\16#\u00d9\13#\3#\3#\3$\3$\3$\5$"+
		"\u00e0\n$\3%\3%\3%\3%\3%\3%\3&\3&\3\'\5\'\u00eb\n\'\3\'\3\'\3\'\6\'\u00f0"+
		"\n\'\r\'\16\'\u00f1\3\'\5\'\u00f5\n\'\3\'\5\'\u00f8\n\'\3\'\3\'\3\'\5"+
		"\'\u00fd\n\'\3(\3(\3(\7(\u0102\n(\f(\16(\u0105\13(\5(\u0107\n(\3)\3)\5"+
		")\u010b\n)\3)\3)\3*\6*\u0110\n*\r*\16*\u0111\3*\3*\2\2+\3\3\5\4\7\5\t"+
		"\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22#\23"+
		"%\24\'\25)\26+\27-\30/\31\61\32\63\33\65\34\67\29\35;\36=\37?\2A C!E\""+
		"G\2I\2K\2M#O\2Q\2S$\3\2\r\3\2\62;\4\2))^^\5\2C\\aac|\6\2\62;C\\aac|\4"+
		"\2$$^^\13\2$$\61\61^^bbddhhppttvv\5\2\62;CHch\3\2\63;\4\2GGgg\4\2--//"+
		"\5\2\13\f\17\17\"\"\2\u0128\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3"+
		"\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2"+
		"\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37"+
		"\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3"+
		"\2\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\2"+
		"9\3\2\2\2\2;\3\2\2\2\2=\3\2\2\2\2A\3\2\2\2\2C\3\2\2\2\2E\3\2\2\2\2M\3"+
		"\2\2\2\2S\3\2\2\2\3U\3\2\2\2\5W\3\2\2\2\7Y\3\2\2\2\t[\3\2\2\2\13]\3\2"+
		"\2\2\r`\3\2\2\2\17b\3\2\2\2\21d\3\2\2\2\23f\3\2\2\2\25h\3\2\2\2\27j\3"+
		"\2\2\2\31l\3\2\2\2\33n\3\2\2\2\35q\3\2\2\2\37t\3\2\2\2!v\3\2\2\2#x\3\2"+
		"\2\2%z\3\2\2\2\'|\3\2\2\2)~\3\2\2\2+\u0080\3\2\2\2-\u0082\3\2\2\2/\u0085"+
		"\3\2\2\2\61\u0087\3\2\2\2\63\u008a\3\2\2\2\65\u008e\3\2\2\2\67\u00a1\3"+
		"\2\2\29\u00a9\3\2\2\2;\u00b5\3\2\2\2=\u00b7\3\2\2\2?\u00c1\3\2\2\2A\u00c9"+
		"\3\2\2\2C\u00cb\3\2\2\2E\u00d2\3\2\2\2G\u00dc\3\2\2\2I\u00e1\3\2\2\2K"+
		"\u00e7\3\2\2\2M\u00fc\3\2\2\2O\u0106\3\2\2\2Q\u0108\3\2\2\2S\u010f\3\2"+
		"\2\2UV\7*\2\2V\4\3\2\2\2WX\7+\2\2X\6\3\2\2\2YZ\7-\2\2Z\b\3\2\2\2[\\\7"+
		"/\2\2\\\n\3\2\2\2]^\7>\2\2^_\7@\2\2_\f\3\2\2\2`a\7(\2\2a\16\3\2\2\2bc"+
		"\7,\2\2c\20\3\2\2\2de\7\61\2\2e\22\3\2\2\2fg\7`\2\2g\24\3\2\2\2hi\7\'"+
		"\2\2i\26\3\2\2\2jk\7.\2\2k\30\3\2\2\2lm\7\60\2\2m\32\3\2\2\2no\7(\2\2"+
		"op\7(\2\2p\34\3\2\2\2qr\7~\2\2rs\7~\2\2s\36\3\2\2\2tu\7#\2\2u \3\2\2\2"+
		"vw\7~\2\2w\"\3\2\2\2xy\7]\2\2y$\3\2\2\2z{\7_\2\2{&\3\2\2\2|}\7}\2\2}("+
		"\3\2\2\2~\177\7\177\2\2\177*\3\2\2\2\u0080\u0081\7<\2\2\u0081,\3\2\2\2"+
		"\u0082\u0083\7]\2\2\u0083\u0084\7A\2\2\u0084.\3\2\2\2\u0085\u0086\7B\2"+
		"\2\u0086\60\3\2\2\2\u0087\u0088\7b\2\2\u0088\62\3\2\2\2\u0089\u008b\7"+
		"/\2\2\u008a\u0089\3\2\2\2\u008a\u008b\3\2\2\2\u008b\u008c\3\2\2\2\u008c"+
		"\u008d\5O(\2\u008d\64\3\2\2\2\u008e\u0090\5\63\32\2\u008f\u0091\7\60\2"+
		"\2\u0090\u008f\3\2\2\2\u0090\u0091\3\2\2\2\u0091\u0095\3\2\2\2\u0092\u0094"+
		"\t\2\2\2\u0093\u0092\3\2\2\2\u0094\u0097\3\2\2\2\u0095\u0093\3\2\2\2\u0095"+
		"\u0096\3\2\2\2\u0096\66\3\2\2\2\u0097\u0095\3\2\2\2\u0098\u0099\7v\2\2"+
		"\u0099\u009a\7t\2\2\u009a\u009b\7w\2\2\u009b\u00a2\7g\2\2\u009c\u009d"+
		"\7h\2\2\u009d\u009e\7c\2\2\u009e\u009f\7n\2\2\u009f\u00a0\7u\2\2\u00a0"+
		"\u00a2\7g\2\2\u00a1\u0098\3\2\2\2\u00a1\u009c\3\2\2\2\u00a28\3\2\2\2\u00a3"+
		"\u00aa\5\67\34\2\u00a4\u00a5\7u\2\2\u00a5\u00a6\7w\2\2\u00a6\u00aa\7o"+
		"\2\2\u00a7\u00a8\7k\2\2\u00a8\u00aa\7h\2\2\u00a9\u00a3\3\2\2\2\u00a9\u00a4"+
		"\3\2\2\2\u00a9\u00a7\3\2\2\2\u00aa:\3\2\2\2\u00ab\u00b6\7>\2\2\u00ac\u00ad"+
		"\7>\2\2\u00ad\u00b6\7?\2\2\u00ae\u00af\7?\2\2\u00af\u00b6\7?\2\2\u00b0"+
		"\u00b1\7@\2\2\u00b1\u00b6\7?\2\2\u00b2\u00b6\7@\2\2\u00b3\u00b4\7#\2\2"+
		"\u00b4\u00b6\7?\2\2\u00b5\u00ab\3\2\2\2\u00b5\u00ac\3\2\2\2\u00b5\u00ae"+
		"\3\2\2\2\u00b5\u00b0\3\2\2\2\u00b5\u00b2\3\2\2\2\u00b5\u00b3\3\2\2\2\u00b6"+
		"<\3\2\2\2\u00b7\u00bc\7)\2\2\u00b8\u00bb\5? \2\u00b9\u00bb\n\3\2\2\u00ba"+
		"\u00b8\3\2\2\2\u00ba\u00b9\3\2\2\2\u00bb\u00be\3\2\2\2\u00bc\u00ba\3\2"+
		"\2\2\u00bc\u00bd\3\2\2\2\u00bd\u00bf\3\2\2\2\u00be\u00bc\3\2\2\2\u00bf"+
		"\u00c0\7)\2\2\u00c0>\3\2\2\2\u00c1\u00c2\7^\2\2\u00c2\u00c3\13\2\2\2\u00c3"+
		"@\3\2\2\2\u00c4\u00ca\5\67\34\2\u00c5\u00c6\7p\2\2\u00c6\u00c7\7w\2\2"+
		"\u00c7\u00c8\7n\2\2\u00c8\u00ca\7n\2\2\u00c9\u00c4\3\2\2\2\u00c9\u00c5"+
		"\3\2\2\2\u00caB\3\2\2\2\u00cb\u00cf\t\4\2\2\u00cc\u00ce\t\5\2\2\u00cd"+
		"\u00cc\3\2\2\2\u00ce\u00d1\3\2\2\2\u00cf\u00cd\3\2\2\2\u00cf\u00d0\3\2"+
		"\2\2\u00d0D\3\2\2\2\u00d1\u00cf\3\2\2\2\u00d2\u00d7\7$\2\2\u00d3\u00d6"+
		"\5G$\2\u00d4\u00d6\n\6\2\2\u00d5\u00d3\3\2\2\2\u00d5\u00d4\3\2\2\2\u00d6"+
		"\u00d9\3\2\2\2\u00d7\u00d5\3\2\2\2\u00d7\u00d8\3\2\2\2\u00d8\u00da\3\2"+
		"\2\2\u00d9\u00d7\3\2\2\2\u00da\u00db\7$\2\2\u00dbF\3\2\2\2\u00dc\u00df"+
		"\7^\2\2\u00dd\u00e0\t\7\2\2\u00de\u00e0\5I%\2\u00df\u00dd\3\2\2\2\u00df"+
		"\u00de\3\2\2\2\u00e0H\3\2\2\2\u00e1\u00e2\7w\2\2\u00e2\u00e3\5K&\2\u00e3"+
		"\u00e4\5K&\2\u00e4\u00e5\5K&\2\u00e5\u00e6\5K&\2\u00e6J\3\2\2\2\u00e7"+
		"\u00e8\t\b\2\2\u00e8L\3\2\2\2\u00e9\u00eb\7/\2\2\u00ea\u00e9\3\2\2\2\u00ea"+
		"\u00eb\3\2\2\2\u00eb\u00ec\3\2\2\2\u00ec\u00ed\5O(\2\u00ed\u00ef\7\60"+
		"\2\2\u00ee\u00f0\t\2\2\2\u00ef\u00ee\3\2\2\2\u00f0\u00f1\3\2\2\2\u00f1"+
		"\u00ef\3\2\2\2\u00f1\u00f2\3\2\2\2\u00f2\u00f4\3\2\2\2\u00f3\u00f5\5Q"+
		")\2\u00f4\u00f3\3\2\2\2\u00f4\u00f5\3\2\2\2\u00f5\u00fd\3\2\2\2\u00f6"+
		"\u00f8\7/\2\2\u00f7\u00f6\3\2\2\2\u00f7\u00f8\3\2\2\2\u00f8\u00f9\3\2"+
		"\2\2\u00f9\u00fa\5O(\2\u00fa\u00fb\5Q)\2\u00fb\u00fd\3\2\2\2\u00fc\u00ea"+
		"\3\2\2\2\u00fc\u00f7\3\2\2\2\u00fdN\3\2\2\2\u00fe\u0107\7\62\2\2\u00ff"+
		"\u0103\t\t\2\2\u0100\u0102\t\2\2\2\u0101\u0100\3\2\2\2\u0102\u0105\3\2"+
		"\2\2\u0103\u0101\3\2\2\2\u0103\u0104\3\2\2\2\u0104\u0107\3\2\2\2\u0105"+
		"\u0103\3\2\2\2\u0106\u00fe\3\2\2\2\u0106\u00ff\3\2\2\2\u0107P\3\2\2\2"+
		"\u0108\u010a\t\n\2\2\u0109\u010b\t\13\2\2\u010a\u0109\3\2\2\2\u010a\u010b"+
		"\3\2\2\2\u010b\u010c\3\2\2\2\u010c\u010d\5O(\2\u010dR\3\2\2\2\u010e\u0110"+
		"\t\f\2\2\u010f\u010e\3\2\2\2\u0110\u0111\3\2\2\2\u0111\u010f\3\2\2\2\u0111"+
		"\u0112\3\2\2\2\u0112\u0113\3\2\2\2\u0113\u0114\b*\2\2\u0114T\3\2\2\2\31"+
		"\2\u008a\u0090\u0095\u00a1\u00a9\u00b5\u00ba\u00bc\u00c9\u00cf\u00d5\u00d7"+
		"\u00df\u00ea\u00f1\u00f4\u00f7\u00fc\u0103\u0106\u010a\u0111\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}
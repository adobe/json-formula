// Generated from /Users/johnbrinkman/dev/json-formula/doc/grammar.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class JsonFormulaLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.9.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, COMPARATOR=22, NAME=23, QUOTED_NAME=24, 
		JSON_FRAGMENT=25, STRING=26, REAL_OR_EXPONENT_NUMBER=27, INT=28, WS=29;
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
			"T__17", "T__18", "T__19", "T__20", "COMPARATOR", "NAME", "QUOTED_NAME", 
			"JSON_FRAGMENT", "STRING", "ESC", "UNICODE", "HEX", "REAL_OR_EXPONENT_NUMBER", 
			"INT", "EXP", "WS"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'.'", "'*'", "'/'", "'&'", "'~'", "'+'", "'-'", "'&&'", "'||'", 
			"'!'", "'('", "')'", "'|'", "'['", "','", "']'", "'{'", "'}'", "':'", 
			"'[?'", "'@'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, "COMPARATOR", 
			"NAME", "QUOTED_NAME", "JSON_FRAGMENT", "STRING", "REAL_OR_EXPONENT_NUMBER", 
			"INT", "WS"
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


	public JsonFormulaLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "grammar.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\37\u00dc\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t"+
		" \4!\t!\4\"\t\"\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3"+
		"\b\3\t\3\t\3\t\3\n\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3"+
		"\17\3\20\3\20\3\21\3\21\3\22\3\22\3\23\3\23\3\24\3\24\3\25\3\25\3\25\3"+
		"\26\3\26\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\5"+
		"\27\177\n\27\3\30\3\30\7\30\u0083\n\30\f\30\16\30\u0086\13\30\3\31\3\31"+
		"\3\31\7\31\u008b\n\31\f\31\16\31\u008e\13\31\3\31\3\31\3\32\3\32\3\32"+
		"\6\32\u0095\n\32\r\32\16\32\u0096\7\32\u0099\n\32\f\32\16\32\u009c\13"+
		"\32\3\32\3\32\3\33\3\33\3\33\7\33\u00a3\n\33\f\33\16\33\u00a6\13\33\3"+
		"\33\3\33\3\34\3\34\3\34\5\34\u00ad\n\34\3\35\3\35\3\35\3\35\3\35\3\35"+
		"\3\36\3\36\3\37\3\37\3\37\6\37\u00ba\n\37\r\37\16\37\u00bb\3\37\5\37\u00bf"+
		"\n\37\3\37\3\37\3\37\5\37\u00c4\n\37\3 \3 \3 \7 \u00c9\n \f \16 \u00cc"+
		"\13 \5 \u00ce\n \3!\3!\5!\u00d2\n!\3!\3!\3\"\6\"\u00d7\n\"\r\"\16\"\u00d8"+
		"\3\"\3\"\2\2#\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16"+
		"\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\32\63\33\65\34"+
		"\67\29\2;\2=\35?\36A\2C\37\3\2\16\6\2&&B\\aac|\7\2&&\62;C\\aac|\4\2))"+
		"^^\4\2^^bb\4\2$$^^\3\2ww\5\2\62;CHch\3\2\62;\3\2\63;\4\2GGgg\4\2--//\5"+
		"\2\13\f\17\17\"\"\2\u00ed\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2"+
		"\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2"+
		"\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3"+
		"\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2"+
		"\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\2=\3"+
		"\2\2\2\2?\3\2\2\2\2C\3\2\2\2\3E\3\2\2\2\5G\3\2\2\2\7I\3\2\2\2\tK\3\2\2"+
		"\2\13M\3\2\2\2\rO\3\2\2\2\17Q\3\2\2\2\21S\3\2\2\2\23V\3\2\2\2\25Y\3\2"+
		"\2\2\27[\3\2\2\2\31]\3\2\2\2\33_\3\2\2\2\35a\3\2\2\2\37c\3\2\2\2!e\3\2"+
		"\2\2#g\3\2\2\2%i\3\2\2\2\'k\3\2\2\2)m\3\2\2\2+p\3\2\2\2-~\3\2\2\2/\u0080"+
		"\3\2\2\2\61\u0087\3\2\2\2\63\u0091\3\2\2\2\65\u009f\3\2\2\2\67\u00a9\3"+
		"\2\2\29\u00ae\3\2\2\2;\u00b4\3\2\2\2=\u00c3\3\2\2\2?\u00cd\3\2\2\2A\u00cf"+
		"\3\2\2\2C\u00d6\3\2\2\2EF\7\60\2\2F\4\3\2\2\2GH\7,\2\2H\6\3\2\2\2IJ\7"+
		"\61\2\2J\b\3\2\2\2KL\7(\2\2L\n\3\2\2\2MN\7\u0080\2\2N\f\3\2\2\2OP\7-\2"+
		"\2P\16\3\2\2\2QR\7/\2\2R\20\3\2\2\2ST\7(\2\2TU\7(\2\2U\22\3\2\2\2VW\7"+
		"~\2\2WX\7~\2\2X\24\3\2\2\2YZ\7#\2\2Z\26\3\2\2\2[\\\7*\2\2\\\30\3\2\2\2"+
		"]^\7+\2\2^\32\3\2\2\2_`\7~\2\2`\34\3\2\2\2ab\7]\2\2b\36\3\2\2\2cd\7.\2"+
		"\2d \3\2\2\2ef\7_\2\2f\"\3\2\2\2gh\7}\2\2h$\3\2\2\2ij\7\177\2\2j&\3\2"+
		"\2\2kl\7<\2\2l(\3\2\2\2mn\7]\2\2no\7A\2\2o*\3\2\2\2pq\7B\2\2q,\3\2\2\2"+
		"r\177\7>\2\2st\7>\2\2t\177\7?\2\2uv\7?\2\2v\177\7?\2\2wx\7@\2\2x\177\7"+
		"?\2\2y\177\7@\2\2z{\7#\2\2{\177\7?\2\2|}\7>\2\2}\177\7@\2\2~r\3\2\2\2"+
		"~s\3\2\2\2~u\3\2\2\2~w\3\2\2\2~y\3\2\2\2~z\3\2\2\2~|\3\2\2\2\177.\3\2"+
		"\2\2\u0080\u0084\t\2\2\2\u0081\u0083\t\3\2\2\u0082\u0081\3\2\2\2\u0083"+
		"\u0086\3\2\2\2\u0084\u0082\3\2\2\2\u0084\u0085\3\2\2\2\u0085\60\3\2\2"+
		"\2\u0086\u0084\3\2\2\2\u0087\u008c\7)\2\2\u0088\u008b\5\67\34\2\u0089"+
		"\u008b\n\4\2\2\u008a\u0088\3\2\2\2\u008a\u0089\3\2\2\2\u008b\u008e\3\2"+
		"\2\2\u008c\u008a\3\2\2\2\u008c\u008d\3\2\2\2\u008d\u008f\3\2\2\2\u008e"+
		"\u008c\3\2\2\2\u008f\u0090\7)\2\2\u0090\62\3\2\2\2\u0091\u009a\7b\2\2"+
		"\u0092\u0099\5\65\33\2\u0093\u0095\n\5\2\2\u0094\u0093\3\2\2\2\u0095\u0096"+
		"\3\2\2\2\u0096\u0094\3\2\2\2\u0096\u0097\3\2\2\2\u0097\u0099\3\2\2\2\u0098"+
		"\u0092\3\2\2\2\u0098\u0094\3\2\2\2\u0099\u009c\3\2\2\2\u009a\u0098\3\2"+
		"\2\2\u009a\u009b\3\2\2\2\u009b\u009d\3\2\2\2\u009c\u009a\3\2\2\2\u009d"+
		"\u009e\7b\2\2\u009e\64\3\2\2\2\u009f\u00a4\7$\2\2\u00a0\u00a3\5\67\34"+
		"\2\u00a1\u00a3\n\6\2\2\u00a2\u00a0\3\2\2\2\u00a2\u00a1\3\2\2\2\u00a3\u00a6"+
		"\3\2\2\2\u00a4\u00a2\3\2\2\2\u00a4\u00a5\3\2\2\2\u00a5\u00a7\3\2\2\2\u00a6"+
		"\u00a4\3\2\2\2\u00a7\u00a8\7$\2\2\u00a8\66\3\2\2\2\u00a9\u00ac\7^\2\2"+
		"\u00aa\u00ad\n\7\2\2\u00ab\u00ad\59\35\2\u00ac\u00aa\3\2\2\2\u00ac\u00ab"+
		"\3\2\2\2\u00ad8\3\2\2\2\u00ae\u00af\7w\2\2\u00af\u00b0\5;\36\2\u00b0\u00b1"+
		"\5;\36\2\u00b1\u00b2\5;\36\2\u00b2\u00b3\5;\36\2\u00b3:\3\2\2\2\u00b4"+
		"\u00b5\t\b\2\2\u00b5<\3\2\2\2\u00b6\u00b7\5? \2\u00b7\u00b9\7\60\2\2\u00b8"+
		"\u00ba\t\t\2\2\u00b9\u00b8\3\2\2\2\u00ba\u00bb\3\2\2\2\u00bb\u00b9\3\2"+
		"\2\2\u00bb\u00bc\3\2\2\2\u00bc\u00be\3\2\2\2\u00bd\u00bf\5A!\2\u00be\u00bd"+
		"\3\2\2\2\u00be\u00bf\3\2\2\2\u00bf\u00c4\3\2\2\2\u00c0\u00c1\5? \2\u00c1"+
		"\u00c2\5A!\2\u00c2\u00c4\3\2\2\2\u00c3\u00b6\3\2\2\2\u00c3\u00c0\3\2\2"+
		"\2\u00c4>\3\2\2\2\u00c5\u00ce\7\62\2\2\u00c6\u00ca\t\n\2\2\u00c7\u00c9"+
		"\t\t\2\2\u00c8\u00c7\3\2\2\2\u00c9\u00cc\3\2\2\2\u00ca\u00c8\3\2\2\2\u00ca"+
		"\u00cb\3\2\2\2\u00cb\u00ce\3\2\2\2\u00cc\u00ca\3\2\2\2\u00cd\u00c5\3\2"+
		"\2\2\u00cd\u00c6\3\2\2\2\u00ce@\3\2\2\2\u00cf\u00d1\t\13\2\2\u00d0\u00d2"+
		"\t\f\2\2\u00d1\u00d0\3\2\2\2\u00d1\u00d2\3\2\2\2\u00d2\u00d3\3\2\2\2\u00d3"+
		"\u00d4\5? \2\u00d4B\3\2\2\2\u00d5\u00d7\t\r\2\2\u00d6\u00d5\3\2\2\2\u00d7"+
		"\u00d8\3\2\2\2\u00d8\u00d6\3\2\2\2\u00d8\u00d9\3\2\2\2\u00d9\u00da\3\2"+
		"\2\2\u00da\u00db\b\"\2\2\u00dbD\3\2\2\2\24\2~\u0084\u008a\u008c\u0096"+
		"\u0098\u009a\u00a2\u00a4\u00ac\u00bb\u00be\u00c3\u00ca\u00cd\u00d1\u00d8"+
		"\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}
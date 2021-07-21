// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONFormulaListener from './JSONFormulaListener.js';
import JSONFormulaVisitor from './JSONFormulaVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003!\u00f3\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003C\n\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\\\n\u0003\f\u0003\u000e",
    "\u0003_\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0005\u0004f\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006n\n\u0006\f\u0006\u000e",
    "\u0006q\u000b\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0007\u0007y\n\u0007\f\u0007\u000e\u0007|\u000b",
    "\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t\u0094\n\t",
    "\u0003\n\u0005\n\u0097\n\n\u0003\n\u0003\n\u0005\n\u009b\n\n\u0003\n",
    "\u0003\n\u0005\n\u009f\n\n\u0005\n\u00a1\n\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0007\u000b\u00a8\n\u000b\f\u000b",
    "\u000e\u000b\u00ab\u000b\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00b5",
    "\n\u000b\u0003\f\u0003\f\u0005\f\u00b9\n\f\u0003\r\u0003\r\u0003\u000e",
    "\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0007\u0013\u00ce\n",
    "\u0013\f\u0013\u000e\u0013\u00d1\u000b\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0005\u0013\u00d7\n\u0013\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0007\u0015\u00e1\n\u0015\f\u0015\u000e\u0015\u00e4\u000b\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u00ea\n",
    "\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005",
    "\u0016\u00f1\n\u0016\u0003\u0016\u0002\u0003\u0004\u0017\u0002\u0004",
    "\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e ",
    "\"$&(*\u0002\u0006\u0003\u0002\u001f \u0003\u0002\u0004\u0005\u0003",
    "\u0002\u0006\u0007\u0003\u0002\u001c\u001e\u0002\u010c\u0002,\u0003",
    "\u0002\u0002\u0002\u0004B\u0003\u0002\u0002\u0002\u0006e\u0003\u0002",
    "\u0002\u0002\bg\u0003\u0002\u0002\u0002\ni\u0003\u0002\u0002\u0002\f",
    "t\u0003\u0002\u0002\u0002\u000e\u007f\u0003\u0002\u0002\u0002\u0010",
    "\u0093\u0003\u0002\u0002\u0002\u0012\u0096\u0003\u0002\u0002\u0002\u0014",
    "\u00b4\u0003\u0002\u0002\u0002\u0016\u00b8\u0003\u0002\u0002\u0002\u0018",
    "\u00ba\u0003\u0002\u0002\u0002\u001a\u00bc\u0003\u0002\u0002\u0002\u001c",
    "\u00be\u0003\u0002\u0002\u0002\u001e\u00c0\u0003\u0002\u0002\u0002 ",
    "\u00c3\u0003\u0002\u0002\u0002\"\u00c7\u0003\u0002\u0002\u0002$\u00d6",
    "\u0003\u0002\u0002\u0002&\u00d8\u0003\u0002\u0002\u0002(\u00e9\u0003",
    "\u0002\u0002\u0002*\u00f0\u0003\u0002\u0002\u0002,-\u0005\u0004\u0003",
    "\u0002-.\u0007\u0002\u0002\u0003.\u0003\u0003\u0002\u0002\u0002/0\b",
    "\u0003\u0001\u00020C\u0005\u0010\t\u00021C\u0005\"\u0012\u000223\u0007",
    "\n\u0002\u00023C\u0005\u0004\u0003\u000f45\u0007\u000b\u0002\u00025",
    "6\u0005\u0004\u0003\u000267\u0007\f\u0002\u00027C\u0003\u0002\u0002",
    "\u00028C\u0005\b\u0005\u00029C\u0005\n\u0006\u0002:C\u0005\f\u0007\u0002",
    ";C\u0005 \u0011\u0002<C\u0005\u0014\u000b\u0002=C\u0007\u001b\u0002",
    "\u0002>C\t\u0002\u0002\u0002?C\u0005\u0018\r\u0002@C\u0005\u001a\u000e",
    "\u0002AC\u0005\u001c\u000f\u0002B/\u0003\u0002\u0002\u0002B1\u0003\u0002",
    "\u0002\u0002B2\u0003\u0002\u0002\u0002B4\u0003\u0002\u0002\u0002B8\u0003",
    "\u0002\u0002\u0002B9\u0003\u0002\u0002\u0002B:\u0003\u0002\u0002\u0002",
    "B;\u0003\u0002\u0002\u0002B<\u0003\u0002\u0002\u0002B=\u0003\u0002\u0002",
    "\u0002B>\u0003\u0002\u0002\u0002B?\u0003\u0002\u0002\u0002B@\u0003\u0002",
    "\u0002\u0002BA\u0003\u0002\u0002\u0002C]\u0003\u0002\u0002\u0002DE\f",
    "\u0015\u0002\u0002EF\t\u0003\u0002\u0002F\\\u0005\u0004\u0003\u0016",
    "GH\f\u0014\u0002\u0002HI\t\u0004\u0002\u0002I\\\u0005\u0004\u0003\u0015",
    "JK\f\u0013\u0002\u0002KL\u0007\u001a\u0002\u0002L\\\u0005\u0004\u0003",
    "\u0014MN\f\u0012\u0002\u0002NO\u0007\b\u0002\u0002O\\\u0005\u0004\u0003",
    "\u0013PQ\f\u0011\u0002\u0002QR\u0007\t\u0002\u0002R\\\u0005\u0004\u0003",
    "\u0012ST\f\b\u0002\u0002TU\u0007\r\u0002\u0002U\\\u0005\u0004\u0003",
    "\tVW\f\u0018\u0002\u0002WX\u0007\u0003\u0002\u0002X\\\u0005\u0006\u0004",
    "\u0002YZ\f\u0017\u0002\u0002Z\\\u0005\u0010\t\u0002[D\u0003\u0002\u0002",
    "\u0002[G\u0003\u0002\u0002\u0002[J\u0003\u0002\u0002\u0002[M\u0003\u0002",
    "\u0002\u0002[P\u0003\u0002\u0002\u0002[S\u0003\u0002\u0002\u0002[V\u0003",
    "\u0002\u0002\u0002[Y\u0003\u0002\u0002\u0002\\_\u0003\u0002\u0002\u0002",
    "][\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^\u0005\u0003\u0002",
    "\u0002\u0002_]\u0003\u0002\u0002\u0002`f\u0005\"\u0012\u0002af\u0005",
    "\n\u0006\u0002bf\u0005\f\u0007\u0002cf\u0005\u0014\u000b\u0002df\u0005",
    "\b\u0005\u0002e`\u0003\u0002\u0002\u0002ea\u0003\u0002\u0002\u0002e",
    "b\u0003\u0002\u0002\u0002ec\u0003\u0002\u0002\u0002ed\u0003\u0002\u0002",
    "\u0002f\u0007\u0003\u0002\u0002\u0002gh\u0007\u0004\u0002\u0002h\t\u0003",
    "\u0002\u0002\u0002ij\u0007\u000e\u0002\u0002jo\u0005\u0004\u0003\u0002",
    "kl\u0007\u000f\u0002\u0002ln\u0005\u0004\u0003\u0002mk\u0003\u0002\u0002",
    "\u0002nq\u0003\u0002\u0002\u0002om\u0003\u0002\u0002\u0002op\u0003\u0002",
    "\u0002\u0002pr\u0003\u0002\u0002\u0002qo\u0003\u0002\u0002\u0002rs\u0007",
    "\u0010\u0002\u0002s\u000b\u0003\u0002\u0002\u0002tu\u0007\u0011\u0002",
    "\u0002uz\u0005\u000e\b\u0002vw\u0007\u000f\u0002\u0002wy\u0005\u000e",
    "\b\u0002xv\u0003\u0002\u0002\u0002y|\u0003\u0002\u0002\u0002zx\u0003",
    "\u0002\u0002\u0002z{\u0003\u0002\u0002\u0002{}\u0003\u0002\u0002\u0002",
    "|z\u0003\u0002\u0002\u0002}~\u0007\u0012\u0002\u0002~\r\u0003\u0002",
    "\u0002\u0002\u007f\u0080\u0005\"\u0012\u0002\u0080\u0081\u0007\u0013",
    "\u0002\u0002\u0081\u0082\u0005\u0004\u0003\u0002\u0082\u000f\u0003\u0002",
    "\u0002\u0002\u0083\u0084\u0007\u000e\u0002\u0002\u0084\u0085\u0007 ",
    "\u0002\u0002\u0085\u0094\u0007\u0010\u0002\u0002\u0086\u0087\u0007\u000e",
    "\u0002\u0002\u0087\u0088\u0007\u0004\u0002\u0002\u0088\u0094\u0007\u0010",
    "\u0002\u0002\u0089\u008a\u0007\u000e\u0002\u0002\u008a\u008b\u0005\u0012",
    "\n\u0002\u008b\u008c\u0007\u0010\u0002\u0002\u008c\u0094\u0003\u0002",
    "\u0002\u0002\u008d\u008e\u0007\u000e\u0002\u0002\u008e\u0094\u0007\u0010",
    "\u0002\u0002\u008f\u0090\u0007\u0014\u0002\u0002\u0090\u0091\u0005\u0004",
    "\u0003\u0002\u0091\u0092\u0007\u0010\u0002\u0002\u0092\u0094\u0003\u0002",
    "\u0002\u0002\u0093\u0083\u0003\u0002\u0002\u0002\u0093\u0086\u0003\u0002",
    "\u0002\u0002\u0093\u0089\u0003\u0002\u0002\u0002\u0093\u008d\u0003\u0002",
    "\u0002\u0002\u0093\u008f\u0003\u0002\u0002\u0002\u0094\u0011\u0003\u0002",
    "\u0002\u0002\u0095\u0097\u0007 \u0002\u0002\u0096\u0095\u0003\u0002",
    "\u0002\u0002\u0096\u0097\u0003\u0002\u0002\u0002\u0097\u0098\u0003\u0002",
    "\u0002\u0002\u0098\u009a\u0007\u0013\u0002\u0002\u0099\u009b\u0007 ",
    "\u0002\u0002\u009a\u0099\u0003\u0002\u0002\u0002\u009a\u009b\u0003\u0002",
    "\u0002\u0002\u009b\u00a0\u0003\u0002\u0002\u0002\u009c\u009e\u0007\u0013",
    "\u0002\u0002\u009d\u009f\u0007 \u0002\u0002\u009e\u009d\u0003\u0002",
    "\u0002\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f\u00a1\u0003\u0002",
    "\u0002\u0002\u00a0\u009c\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002",
    "\u0002\u0002\u00a1\u0013\u0003\u0002\u0002\u0002\u00a2\u00a3\u0007\u001d",
    "\u0002\u0002\u00a3\u00a4\u0007\u000b\u0002\u0002\u00a4\u00a9\u0005\u0016",
    "\f\u0002\u00a5\u00a6\u0007\u000f\u0002\u0002\u00a6\u00a8\u0005\u0016",
    "\f\u0002\u00a7\u00a5\u0003\u0002\u0002\u0002\u00a8\u00ab\u0003\u0002",
    "\u0002\u0002\u00a9\u00a7\u0003\u0002\u0002\u0002\u00a9\u00aa\u0003\u0002",
    "\u0002\u0002\u00aa\u00ac\u0003\u0002\u0002\u0002\u00ab\u00a9\u0003\u0002",
    "\u0002\u0002\u00ac\u00ad\u0007\f\u0002\u0002\u00ad\u00b5\u0003\u0002",
    "\u0002\u0002\u00ae\u00af\u0007\u001d\u0002\u0002\u00af\u00b0\u0007\u000b",
    "\u0002\u0002\u00b0\u00b5\u0007\f\u0002\u0002\u00b1\u00b2\u0007\u001c",
    "\u0002\u0002\u00b2\u00b3\u0007\u000b\u0002\u0002\u00b3\u00b5\u0007\f",
    "\u0002\u0002\u00b4\u00a2\u0003\u0002\u0002\u0002\u00b4\u00ae\u0003\u0002",
    "\u0002\u0002\u00b4\u00b1\u0003\u0002\u0002\u0002\u00b5\u0015\u0003\u0002",
    "\u0002\u0002\u00b6\u00b9\u0005\u0004\u0003\u0002\u00b7\u00b9\u0005\u001e",
    "\u0010\u0002\u00b8\u00b6\u0003\u0002\u0002\u0002\u00b8\u00b7\u0003\u0002",
    "\u0002\u0002\u00b9\u0017\u0003\u0002\u0002\u0002\u00ba\u00bb\u0007\u0015",
    "\u0002\u0002\u00bb\u0019\u0003\u0002\u0002\u0002\u00bc\u00bd\u0007\u0016",
    "\u0002\u0002\u00bd\u001b\u0003\u0002\u0002\u0002\u00be\u00bf\u0007\u0017",
    "\u0002\u0002\u00bf\u001d\u0003\u0002\u0002\u0002\u00c0\u00c1\u0007\u0018",
    "\u0002\u0002\u00c1\u00c2\u0005\u0004\u0003\u0002\u00c2\u001f\u0003\u0002",
    "\u0002\u0002\u00c3\u00c4\u0007\u0019\u0002\u0002\u00c4\u00c5\u0005*",
    "\u0016\u0002\u00c5\u00c6\u0007\u0019\u0002\u0002\u00c6!\u0003\u0002",
    "\u0002\u0002\u00c7\u00c8\t\u0005\u0002\u0002\u00c8#\u0003\u0002\u0002",
    "\u0002\u00c9\u00ca\u0007\u0011\u0002\u0002\u00ca\u00cf\u0005&\u0014",
    "\u0002\u00cb\u00cc\u0007\u000f\u0002\u0002\u00cc\u00ce\u0005&\u0014",
    "\u0002\u00cd\u00cb\u0003\u0002\u0002\u0002\u00ce\u00d1\u0003\u0002\u0002",
    "\u0002\u00cf\u00cd\u0003\u0002\u0002\u0002\u00cf\u00d0\u0003\u0002\u0002",
    "\u0002\u00d0\u00d2\u0003\u0002\u0002\u0002\u00d1\u00cf\u0003\u0002\u0002",
    "\u0002\u00d2\u00d3\u0007\u0012\u0002\u0002\u00d3\u00d7\u0003\u0002\u0002",
    "\u0002\u00d4\u00d5\u0007\u0011\u0002\u0002\u00d5\u00d7\u0007\u0012\u0002",
    "\u0002\u00d6\u00c9\u0003\u0002\u0002\u0002\u00d6\u00d4\u0003\u0002\u0002",
    "\u0002\u00d7%\u0003\u0002\u0002\u0002\u00d8\u00d9\u0007\u001e\u0002",
    "\u0002\u00d9\u00da\u0007\u0013\u0002\u0002\u00da\u00db\u0005*\u0016",
    "\u0002\u00db\'\u0003\u0002\u0002\u0002\u00dc\u00dd\u0007\u000e\u0002",
    "\u0002\u00dd\u00e2\u0005*\u0016\u0002\u00de\u00df\u0007\u000f\u0002",
    "\u0002\u00df\u00e1\u0005*\u0016\u0002\u00e0\u00de\u0003\u0002\u0002",
    "\u0002\u00e1\u00e4\u0003\u0002\u0002\u0002\u00e2\u00e0\u0003\u0002\u0002",
    "\u0002\u00e2\u00e3\u0003\u0002\u0002\u0002\u00e3\u00e5\u0003\u0002\u0002",
    "\u0002\u00e4\u00e2\u0003\u0002\u0002\u0002\u00e5\u00e6\u0007\u0010\u0002",
    "\u0002\u00e6\u00ea\u0003\u0002\u0002\u0002\u00e7\u00e8\u0007\u000e\u0002",
    "\u0002\u00e8\u00ea\u0007\u0010\u0002\u0002\u00e9\u00dc\u0003\u0002\u0002",
    "\u0002\u00e9\u00e7\u0003\u0002\u0002\u0002\u00ea)\u0003\u0002\u0002",
    "\u0002\u00eb\u00f1\u0007\u001e\u0002\u0002\u00ec\u00f1\t\u0002\u0002",
    "\u0002\u00ed\u00f1\u0005$\u0013\u0002\u00ee\u00f1\u0005(\u0015\u0002",
    "\u00ef\u00f1\u0007\u001c\u0002\u0002\u00f0\u00eb\u0003\u0002\u0002\u0002",
    "\u00f0\u00ec\u0003\u0002\u0002\u0002\u00f0\u00ed\u0003\u0002\u0002\u0002",
    "\u00f0\u00ee\u0003\u0002\u0002\u0002\u00f0\u00ef\u0003\u0002\u0002\u0002",
    "\u00f1+\u0003\u0002\u0002\u0002\u0015B[]eoz\u0093\u0096\u009a\u009e",
    "\u00a0\u00a9\u00b4\u00b8\u00cf\u00d6\u00e2\u00e9\u00f0"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class JSONFormulaParser extends antlr4.Parser {

    static grammarFileName = "JSONFormula.g4";
    static literalNames = [ null, "'.'", "'*'", "'/'", "'+'", "'-'", "'&&'", 
                            "'||'", "'!'", "'('", "')'", "'|'", "'['", "','", 
                            "']'", "'{'", "'}'", "':'", "'[?'", "'@'", "'$form'", 
                            "'$field'", "'&'", "'`'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", 
                             "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", 
                             "SIGNED_INT", "WS" ];
    static ruleNames = [ "formula", "expression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "bracketSpecifier", "slice", "functionExpression", 
                         "functionArg", "currentNode", "form", "currentField", 
                         "expressionType", "literal", "identifier", "jsonObject", 
                         "jsonObjectPair", "jsonArray", "jsonValue" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JSONFormulaParser.ruleNames;
        this.literalNames = JSONFormulaParser.literalNames;
        this.symbolicNames = JSONFormulaParser.symbolicNames;
    }

    get atn() {
        return atn;
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
    			return this.precpred(this._ctx, 6);
    		case 6:
    			return this.precpred(this._ctx, 22);
    		case 7:
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
	        this.state = 42;
	        this.expression(0);
	        this.state = 43;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 64;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 46;
	            this.bracketSpecifier();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 47;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 48;
	            this.match(JSONFormulaParser.T__7);
	            this.state = 49;
	            this.expression(13);
	            break;

	        case 4:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            this.match(JSONFormulaParser.T__8);
	            this.state = 51;
	            this.expression(0);
	            this.state = 52;
	            this.match(JSONFormulaParser.T__9);
	            break;

	        case 5:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 54;
	            this.wildcard();
	            break;

	        case 6:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 55;
	            this.multiSelectList();
	            break;

	        case 7:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 56;
	            this.multiSelectHash();
	            break;

	        case 8:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 57;
	            this.literal();
	            break;

	        case 9:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 58;
	            this.functionExpression();
	            break;

	        case 10:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 59;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 11:
	            localctx = new NumberLiteralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 60;
	            _la = this._input.LA(1);
	            if(!(_la===JSONFormulaParser.REAL_OR_EXPONENT_NUMBER || _la===JSONFormulaParser.SIGNED_INT)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;

	        case 12:
	            localctx = new CurrentNodeExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 61;
	            this.currentNode();
	            break;

	        case 13:
	            localctx = new FormExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 62;
	            this.form();
	            break;

	        case 14:
	            localctx = new CurrentFieldExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 63;
	            this.currentField();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 91;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 89;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MultDivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 66;
	                    if (!( this.precpred(this._ctx, 19))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
	                    }
	                    this.state = 67;
	                    _la = this._input.LA(1);
	                    if(!(_la===JSONFormulaParser.T__1 || _la===JSONFormulaParser.T__2)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 68;
	                    this.expression(20);
	                    break;

	                case 2:
	                    localctx = new AddSubtractExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 69;
	                    if (!( this.precpred(this._ctx, 18))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
	                    }
	                    this.state = 70;
	                    _la = this._input.LA(1);
	                    if(!(_la===JSONFormulaParser.T__3 || _la===JSONFormulaParser.T__4)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 71;
	                    this.expression(19);
	                    break;

	                case 3:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 72;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 73;
	                    this.match(JSONFormulaParser.COMPARATOR);
	                    this.state = 74;
	                    this.expression(18);
	                    break;

	                case 4:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 75;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 76;
	                    this.match(JSONFormulaParser.T__5);
	                    this.state = 77;
	                    this.expression(17);
	                    break;

	                case 5:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 78;
	                    if (!( this.precpred(this._ctx, 15))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
	                    }
	                    this.state = 79;
	                    this.match(JSONFormulaParser.T__6);
	                    this.state = 80;
	                    this.expression(16);
	                    break;

	                case 6:
	                    localctx = new PipeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 81;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 82;
	                    this.match(JSONFormulaParser.T__10);
	                    this.state = 83;
	                    this.expression(7);
	                    break;

	                case 7:
	                    localctx = new ChainExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 84;
	                    if (!( this.precpred(this._ctx, 22))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
	                    }
	                    this.state = 85;
	                    this.match(JSONFormulaParser.T__0);
	                    this.state = 86;
	                    this.chainedExpression();
	                    break;

	                case 8:
	                    localctx = new BracketedExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 87;
	                    if (!( this.precpred(this._ctx, 21))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
	                    }
	                    this.state = 88;
	                    this.bracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 93;
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
	        this.state = 99;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 94;
	            this.identifier();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 95;
	            this.multiSelectList();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 96;
	            this.multiSelectHash();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 97;
	            this.functionExpression();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 98;
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
	        this.state = 101;
	        this.match(JSONFormulaParser.T__1);
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 103;
	        this.match(JSONFormulaParser.T__11);
	        this.state = 104;
	        this.expression(0);
	        this.state = 109;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__12) {
	            this.state = 105;
	            this.match(JSONFormulaParser.T__12);
	            this.state = 106;
	            this.expression(0);
	            this.state = 111;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 112;
	        this.match(JSONFormulaParser.T__13);
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 114;
	        this.match(JSONFormulaParser.T__14);
	        this.state = 115;
	        this.keyvalExpr();
	        this.state = 120;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__12) {
	            this.state = 116;
	            this.match(JSONFormulaParser.T__12);
	            this.state = 117;
	            this.keyvalExpr();
	            this.state = 122;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 123;
	        this.match(JSONFormulaParser.T__15);
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
	        this.state = 125;
	        this.identifier();
	        this.state = 126;
	        this.match(JSONFormulaParser.T__16);
	        this.state = 127;
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



	bracketSpecifier() {
	    let localctx = new BracketSpecifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, JSONFormulaParser.RULE_bracketSpecifier);
	    try {
	        this.state = 145;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 129;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 130;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            this.state = 131;
	            this.match(JSONFormulaParser.T__13);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 132;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 133;
	            this.match(JSONFormulaParser.T__1);
	            this.state = 134;
	            this.match(JSONFormulaParser.T__13);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 135;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 136;
	            this.slice();
	            this.state = 137;
	            this.match(JSONFormulaParser.T__13);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 139;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 140;
	            this.match(JSONFormulaParser.T__13);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 141;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 142;
	            this.expression(0);
	            this.state = 143;
	            this.match(JSONFormulaParser.T__13);
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
	    this.enterRule(localctx, 16, JSONFormulaParser.RULE_slice);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 148;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 147;
	            localctx.start = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 150;
	        this.match(JSONFormulaParser.T__16);
	        this.state = 152;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 151;
	            localctx.stop = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 158;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.T__16) {
	            this.state = 154;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 156;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===JSONFormulaParser.SIGNED_INT) {
	                this.state = 155;
	                localctx.step = this.match(JSONFormulaParser.SIGNED_INT);
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
	    this.enterRule(localctx, 18, JSONFormulaParser.RULE_functionExpression);
	    var _la = 0; // Token type
	    try {
	        this.state = 178;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 160;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 161;
	            this.match(JSONFormulaParser.T__8);
	            this.state = 162;
	            this.functionArg();
	            this.state = 167;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__12) {
	                this.state = 163;
	                this.match(JSONFormulaParser.T__12);
	                this.state = 164;
	                this.functionArg();
	                this.state = 169;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 170;
	            this.match(JSONFormulaParser.T__9);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 172;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 173;
	            this.match(JSONFormulaParser.T__8);
	            this.state = 174;
	            this.match(JSONFormulaParser.T__9);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 175;
	            this.match(JSONFormulaParser.JSON_CONSTANT);
	            this.state = 176;
	            this.match(JSONFormulaParser.T__8);
	            this.state = 177;
	            this.match(JSONFormulaParser.T__9);
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
	    this.enterRule(localctx, 20, JSONFormulaParser.RULE_functionArg);
	    try {
	        this.state = 182;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__1:
	        case JSONFormulaParser.T__7:
	        case JSONFormulaParser.T__8:
	        case JSONFormulaParser.T__11:
	        case JSONFormulaParser.T__14:
	        case JSONFormulaParser.T__17:
	        case JSONFormulaParser.T__18:
	        case JSONFormulaParser.T__19:
	        case JSONFormulaParser.T__20:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	        case JSONFormulaParser.SIGNED_INT:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 180;
	            this.expression(0);
	            break;
	        case JSONFormulaParser.T__21:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 181;
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
	    this.enterRule(localctx, 22, JSONFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 184;
	        this.match(JSONFormulaParser.T__18);
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



	form() {
	    let localctx = new FormContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, JSONFormulaParser.RULE_form);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 186;
	        this.match(JSONFormulaParser.T__19);
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



	currentField() {
	    let localctx = new CurrentFieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, JSONFormulaParser.RULE_currentField);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 188;
	        this.match(JSONFormulaParser.T__20);
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
	    this.enterRule(localctx, 28, JSONFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 190;
	        this.match(JSONFormulaParser.T__21);
	        this.state = 191;
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
	    this.enterRule(localctx, 30, JSONFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 193;
	        this.match(JSONFormulaParser.T__22);
	        this.state = 194;
	        this.jsonValue();
	        this.state = 195;
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
	    this.enterRule(localctx, 32, JSONFormulaParser.RULE_identifier);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 197;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << JSONFormulaParser.JSON_CONSTANT) | (1 << JSONFormulaParser.NAME) | (1 << JSONFormulaParser.STRING))) !== 0))) {
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
	    this.enterRule(localctx, 34, JSONFormulaParser.RULE_jsonObject);
	    var _la = 0; // Token type
	    try {
	        this.state = 212;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 199;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 200;
	            this.jsonObjectPair();
	            this.state = 205;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__12) {
	                this.state = 201;
	                this.match(JSONFormulaParser.T__12);
	                this.state = 202;
	                this.jsonObjectPair();
	                this.state = 207;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 208;
	            this.match(JSONFormulaParser.T__15);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 210;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 211;
	            this.match(JSONFormulaParser.T__15);
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
	    this.enterRule(localctx, 36, JSONFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 214;
	        this.match(JSONFormulaParser.STRING);
	        this.state = 215;
	        this.match(JSONFormulaParser.T__16);
	        this.state = 216;
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
	    this.enterRule(localctx, 38, JSONFormulaParser.RULE_jsonArray);
	    var _la = 0; // Token type
	    try {
	        this.state = 231;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 218;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 219;
	            this.jsonValue();
	            this.state = 224;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__12) {
	                this.state = 220;
	                this.match(JSONFormulaParser.T__12);
	                this.state = 221;
	                this.jsonValue();
	                this.state = 226;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 227;
	            this.match(JSONFormulaParser.T__13);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 229;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 230;
	            this.match(JSONFormulaParser.T__13);
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
	    this.enterRule(localctx, 40, JSONFormulaParser.RULE_jsonValue);
	    var _la = 0; // Token type
	    try {
	        this.state = 238;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.STRING:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 233;
	            this.match(JSONFormulaParser.STRING);
	            break;
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	        case JSONFormulaParser.SIGNED_INT:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 234;
	            _la = this._input.LA(1);
	            if(!(_la===JSONFormulaParser.REAL_OR_EXPONENT_NUMBER || _la===JSONFormulaParser.SIGNED_INT)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case JSONFormulaParser.T__14:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 235;
	            this.jsonObject();
	            break;
	        case JSONFormulaParser.T__11:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 236;
	            this.jsonArray();
	            break;
	        case JSONFormulaParser.JSON_CONSTANT:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 237;
	            this.match(JSONFormulaParser.JSON_CONSTANT);
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
JSONFormulaParser.RAW_STRING = 25;
JSONFormulaParser.JSON_CONSTANT = 26;
JSONFormulaParser.NAME = 27;
JSONFormulaParser.STRING = 28;
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
JSONFormulaParser.RULE_bracketSpecifier = 7;
JSONFormulaParser.RULE_slice = 8;
JSONFormulaParser.RULE_functionExpression = 9;
JSONFormulaParser.RULE_functionArg = 10;
JSONFormulaParser.RULE_currentNode = 11;
JSONFormulaParser.RULE_form = 12;
JSONFormulaParser.RULE_currentField = 13;
JSONFormulaParser.RULE_expressionType = 14;
JSONFormulaParser.RULE_literal = 15;
JSONFormulaParser.RULE_identifier = 16;
JSONFormulaParser.RULE_jsonObject = 17;
JSONFormulaParser.RULE_jsonObjectPair = 18;
JSONFormulaParser.RULE_jsonArray = 19;
JSONFormulaParser.RULE_jsonValue = 20;

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

class CurrentFieldExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	currentField() {
	    return this.getTypedRuleContext(CurrentFieldContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterCurrentFieldExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitCurrentFieldExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitCurrentFieldExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.CurrentFieldExpressionContext = CurrentFieldExpressionContext;

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

class FormExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	form() {
	    return this.getTypedRuleContext(FormContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFormExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFormExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitFormExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.FormExpressionContext = FormExpressionContext;

class BracketExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	bracketSpecifier() {
	    return this.getTypedRuleContext(BracketSpecifierContext,0);
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

	bracketSpecifier() {
	    return this.getTypedRuleContext(BracketSpecifierContext,0);
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
	        listener.enterMultiSelectHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitMultiSelectHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitMultiSelectHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



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



class BracketSpecifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_bracketSpecifier;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class SelectContext extends BracketSpecifierContext {

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

class BracketFlattenContext extends BracketSpecifierContext {

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

class BracketSliceContext extends BracketSpecifierContext {

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

class BracketIndexContext extends BracketSpecifierContext {

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

class BracketStarContext extends BracketSpecifierContext {

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
        this.start = null; // Token
        this.stop = null; // Token
        this.step = null; // Token
    }

	SIGNED_INT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONFormulaParser.SIGNED_INT);
	    } else {
	        return this.getToken(JSONFormulaParser.SIGNED_INT, i);
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

	JSON_CONSTANT() {
	    return this.getToken(JSONFormulaParser.JSON_CONSTANT, 0);
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



class FormContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_form;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterForm(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitForm(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitForm(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CurrentFieldContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_currentField;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterCurrentField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitCurrentField(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitCurrentField(this);
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

	STRING() {
	    return this.getToken(JSONFormulaParser.STRING, 0);
	};

	JSON_CONSTANT() {
	    return this.getToken(JSONFormulaParser.JSON_CONSTANT, 0);
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

	JSON_CONSTANT() {
	    return this.getToken(JSONFormulaParser.JSON_CONSTANT, 0);
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
JSONFormulaParser.BracketSpecifierContext = BracketSpecifierContext; 
JSONFormulaParser.SliceContext = SliceContext; 
JSONFormulaParser.FunctionExpressionContext = FunctionExpressionContext; 
JSONFormulaParser.FunctionArgContext = FunctionArgContext; 
JSONFormulaParser.CurrentNodeContext = CurrentNodeContext; 
JSONFormulaParser.FormContext = FormContext; 
JSONFormulaParser.CurrentFieldContext = CurrentFieldContext; 
JSONFormulaParser.ExpressionTypeContext = ExpressionTypeContext; 
JSONFormulaParser.LiteralContext = LiteralContext; 
JSONFormulaParser.IdentifierContext = IdentifierContext; 
JSONFormulaParser.JsonObjectContext = JsonObjectContext; 
JSONFormulaParser.JsonObjectPairContext = JsonObjectPairContext; 
JSONFormulaParser.JsonArrayContext = JsonArrayContext; 
JSONFormulaParser.JsonValueContext = JsonValueContext; 

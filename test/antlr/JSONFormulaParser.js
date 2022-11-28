// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONFormulaListener from './JSONFormulaListener.js';
import JSONFormulaVisitor from './JSONFormulaVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003#\u0103\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003E\n\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0007\u0003a\n\u0003\f\u0003\u000e\u0003d\u000b",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005",
    "\u0004k\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0007\u0006s\n\u0006\f\u0006\u000e\u0006v\u000b\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0007\u0007\u0080\n\u0007\f\u0007\u000e\u0007",
    "\u0083\u000b\u0007\u0003\u0007\u0003\u0007\u0005\u0007\u0087\n\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0005\t\u009d\n\t\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0005\n\u00a4\n\n\u0003\u000b\u0005\u000b\u00a7\n\u000b\u0003",
    "\u000b\u0003\u000b\u0005\u000b\u00ab\n\u000b\u0003\u000b\u0003\u000b",
    "\u0005\u000b\u00af\n\u000b\u0005\u000b\u00b1\n\u000b\u0003\f\u0003\f",
    "\u0003\f\u0003\f\u0003\f\u0007\f\u00b8\n\f\f\f\u000e\f\u00bb\u000b\f",
    "\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005",
    "\f\u00c5\n\f\u0003\r\u0003\r\u0005\r\u00c9\n\r\u0003\u000e\u0003\u000e",
    "\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0007\u0014",
    "\u00de\n\u0014\f\u0014\u000e\u0014\u00e1\u000b\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u00e7\n\u0014\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0007\u0016\u00f1\n\u0016\f\u0016\u000e\u0016\u00f4\u000b",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00fa",
    "\n\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0005\u0017\u0101\n\u0017\u0003\u0017\u0002\u0003\u0004\u0018\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"$&(*,\u0002\u0006\u0003\u0002!\"\u0003\u0002\u0005\b\u0003\u0002",
    "\t\n\u0003\u0002\u001e \u0002\u011e\u0002.\u0003\u0002\u0002\u0002\u0004",
    "D\u0003\u0002\u0002\u0002\u0006j\u0003\u0002\u0002\u0002\bl\u0003\u0002",
    "\u0002\u0002\nn\u0003\u0002\u0002\u0002\f\u0086\u0003\u0002\u0002\u0002",
    "\u000e\u0088\u0003\u0002\u0002\u0002\u0010\u009c\u0003\u0002\u0002\u0002",
    "\u0012\u00a3\u0003\u0002\u0002\u0002\u0014\u00a6\u0003\u0002\u0002\u0002",
    "\u0016\u00c4\u0003\u0002\u0002\u0002\u0018\u00c8\u0003\u0002\u0002\u0002",
    "\u001a\u00ca\u0003\u0002\u0002\u0002\u001c\u00cc\u0003\u0002\u0002\u0002",
    "\u001e\u00ce\u0003\u0002\u0002\u0002 \u00d0\u0003\u0002\u0002\u0002",
    "\"\u00d3\u0003\u0002\u0002\u0002$\u00d7\u0003\u0002\u0002\u0002&\u00e6",
    "\u0003\u0002\u0002\u0002(\u00e8\u0003\u0002\u0002\u0002*\u00f9\u0003",
    "\u0002\u0002\u0002,\u0100\u0003\u0002\u0002\u0002./\u0005\u0004\u0003",
    "\u0002/0\u0007\u0002\u0002\u00030\u0003\u0003\u0002\u0002\u000212\b",
    "\u0003\u0001\u00022E\u0005\u0010\t\u00023E\u0005$\u0013\u000245\u0007",
    "\r\u0002\u00025E\u0005\u0004\u0003\u000f67\u0007\u000e\u0002\u00027",
    "8\u0005\u0004\u0003\u000289\u0007\u000f\u0002\u00029E\u0003\u0002\u0002",
    "\u0002:E\u0005\b\u0005\u0002;E\u0005\n\u0006\u0002<E\u0005\f\u0007\u0002",
    "=E\u0005\"\u0012\u0002>E\u0005\u0016\f\u0002?E\u0007\u001d\u0002\u0002",
    "@E\t\u0002\u0002\u0002AE\u0005\u001a\u000e\u0002BE\u0005\u001c\u000f",
    "\u0002CE\u0005\u001e\u0010\u0002D1\u0003\u0002\u0002\u0002D3\u0003\u0002",
    "\u0002\u0002D4\u0003\u0002\u0002\u0002D6\u0003\u0002\u0002\u0002D:\u0003",
    "\u0002\u0002\u0002D;\u0003\u0002\u0002\u0002D<\u0003\u0002\u0002\u0002",
    "D=\u0003\u0002\u0002\u0002D>\u0003\u0002\u0002\u0002D?\u0003\u0002\u0002",
    "\u0002D@\u0003\u0002\u0002\u0002DA\u0003\u0002\u0002\u0002DB\u0003\u0002",
    "\u0002\u0002DC\u0003\u0002\u0002\u0002Eb\u0003\u0002\u0002\u0002FG\f",
    "\u0016\u0002\u0002GH\u0007\u0004\u0002\u0002Ha\u0005\u0004\u0003\u0017",
    "IJ\f\u0015\u0002\u0002JK\t\u0003\u0002\u0002Ka\u0005\u0004\u0003\u0016",
    "LM\f\u0014\u0002\u0002MN\t\u0004\u0002\u0002Na\u0005\u0004\u0003\u0015",
    "OP\f\u0013\u0002\u0002PQ\u0007\u001c\u0002\u0002Qa\u0005\u0004\u0003",
    "\u0014RS\f\u0012\u0002\u0002ST\u0007\u000b\u0002\u0002Ta\u0005\u0004",
    "\u0003\u0013UV\f\u0011\u0002\u0002VW\u0007\f\u0002\u0002Wa\u0005\u0004",
    "\u0003\u0012XY\f\b\u0002\u0002YZ\u0007\u0010\u0002\u0002Za\u0005\u0004",
    "\u0003\t[\\\f\u0019\u0002\u0002\\]\u0007\u0003\u0002\u0002]a\u0005\u0006",
    "\u0004\u0002^_\f\u0018\u0002\u0002_a\u0005\u0012\n\u0002`F\u0003\u0002",
    "\u0002\u0002`I\u0003\u0002\u0002\u0002`L\u0003\u0002\u0002\u0002`O\u0003",
    "\u0002\u0002\u0002`R\u0003\u0002\u0002\u0002`U\u0003\u0002\u0002\u0002",
    "`X\u0003\u0002\u0002\u0002`[\u0003\u0002\u0002\u0002`^\u0003\u0002\u0002",
    "\u0002ad\u0003\u0002\u0002\u0002b`\u0003\u0002\u0002\u0002bc\u0003\u0002",
    "\u0002\u0002c\u0005\u0003\u0002\u0002\u0002db\u0003\u0002\u0002\u0002",
    "ek\u0005$\u0013\u0002fk\u0005\n\u0006\u0002gk\u0005\f\u0007\u0002hk",
    "\u0005\u0016\f\u0002ik\u0005\b\u0005\u0002je\u0003\u0002\u0002\u0002",
    "jf\u0003\u0002\u0002\u0002jg\u0003\u0002\u0002\u0002jh\u0003\u0002\u0002",
    "\u0002ji\u0003\u0002\u0002\u0002k\u0007\u0003\u0002\u0002\u0002lm\u0007",
    "\u0005\u0002\u0002m\t\u0003\u0002\u0002\u0002no\u0007\u0011\u0002\u0002",
    "ot\u0005\u0004\u0003\u0002pq\u0007\u0012\u0002\u0002qs\u0005\u0004\u0003",
    "\u0002rp\u0003\u0002\u0002\u0002sv\u0003\u0002\u0002\u0002tr\u0003\u0002",
    "\u0002\u0002tu\u0003\u0002\u0002\u0002uw\u0003\u0002\u0002\u0002vt\u0003",
    "\u0002\u0002\u0002wx\u0007\u0013\u0002\u0002x\u000b\u0003\u0002\u0002",
    "\u0002yz\u0007\u0014\u0002\u0002z\u0087\u0007\u0015\u0002\u0002{|\u0007",
    "\u0014\u0002\u0002|\u0081\u0005\u000e\b\u0002}~\u0007\u0012\u0002\u0002",
    "~\u0080\u0005\u000e\b\u0002\u007f}\u0003\u0002\u0002\u0002\u0080\u0083",
    "\u0003\u0002\u0002\u0002\u0081\u007f\u0003\u0002\u0002\u0002\u0081\u0082",
    "\u0003\u0002\u0002\u0002\u0082\u0084\u0003\u0002\u0002\u0002\u0083\u0081",
    "\u0003\u0002\u0002\u0002\u0084\u0085\u0007\u0015\u0002\u0002\u0085\u0087",
    "\u0003\u0002\u0002\u0002\u0086y\u0003\u0002\u0002\u0002\u0086{\u0003",
    "\u0002\u0002\u0002\u0087\r\u0003\u0002\u0002\u0002\u0088\u0089\u0005",
    "$\u0013\u0002\u0089\u008a\u0007\u0016\u0002\u0002\u008a\u008b\u0005",
    "\u0004\u0003\u0002\u008b\u000f\u0003\u0002\u0002\u0002\u008c\u008d\u0007",
    "\u0011\u0002\u0002\u008d\u008e\u0007\"\u0002\u0002\u008e\u009d\u0007",
    "\u0013\u0002\u0002\u008f\u0090\u0007\u0011\u0002\u0002\u0090\u0091\u0007",
    "\u0005\u0002\u0002\u0091\u009d\u0007\u0013\u0002\u0002\u0092\u0093\u0007",
    "\u0011\u0002\u0002\u0093\u0094\u0005\u0014\u000b\u0002\u0094\u0095\u0007",
    "\u0013\u0002\u0002\u0095\u009d\u0003\u0002\u0002\u0002\u0096\u0097\u0007",
    "\u0011\u0002\u0002\u0097\u009d\u0007\u0013\u0002\u0002\u0098\u0099\u0007",
    "\u0017\u0002\u0002\u0099\u009a\u0005\u0004\u0003\u0002\u009a\u009b\u0007",
    "\u0013\u0002\u0002\u009b\u009d\u0003\u0002\u0002\u0002\u009c\u008c\u0003",
    "\u0002\u0002\u0002\u009c\u008f\u0003\u0002\u0002\u0002\u009c\u0092\u0003",
    "\u0002\u0002\u0002\u009c\u0096\u0003\u0002\u0002\u0002\u009c\u0098\u0003",
    "\u0002\u0002\u0002\u009d\u0011\u0003\u0002\u0002\u0002\u009e\u00a4\u0005",
    "\u0010\t\u0002\u009f\u00a0\u0007\u0011\u0002\u0002\u00a0\u00a1\u0005",
    "\u0004\u0003\u0002\u00a1\u00a2\u0007\u0013\u0002\u0002\u00a2\u00a4\u0003",
    "\u0002\u0002\u0002\u00a3\u009e\u0003\u0002\u0002\u0002\u00a3\u009f\u0003",
    "\u0002\u0002\u0002\u00a4\u0013\u0003\u0002\u0002\u0002\u00a5\u00a7\u0005",
    "\u0004\u0003\u0002\u00a6\u00a5\u0003\u0002\u0002\u0002\u00a6\u00a7\u0003",
    "\u0002\u0002\u0002\u00a7\u00a8\u0003\u0002\u0002\u0002\u00a8\u00aa\u0007",
    "\u0016\u0002\u0002\u00a9\u00ab\u0005\u0004\u0003\u0002\u00aa\u00a9\u0003",
    "\u0002\u0002\u0002\u00aa\u00ab\u0003\u0002\u0002\u0002\u00ab\u00b0\u0003",
    "\u0002\u0002\u0002\u00ac\u00ae\u0007\u0016\u0002\u0002\u00ad\u00af\u0005",
    "\u0004\u0003\u0002\u00ae\u00ad\u0003\u0002\u0002\u0002\u00ae\u00af\u0003",
    "\u0002\u0002\u0002\u00af\u00b1\u0003\u0002\u0002\u0002\u00b0\u00ac\u0003",
    "\u0002\u0002\u0002\u00b0\u00b1\u0003\u0002\u0002\u0002\u00b1\u0015\u0003",
    "\u0002\u0002\u0002\u00b2\u00b3\u0007\u001f\u0002\u0002\u00b3\u00b4\u0007",
    "\u000e\u0002\u0002\u00b4\u00b9\u0005\u0018\r\u0002\u00b5\u00b6\u0007",
    "\u0012\u0002\u0002\u00b6\u00b8\u0005\u0018\r\u0002\u00b7\u00b5\u0003",
    "\u0002\u0002\u0002\u00b8\u00bb\u0003\u0002\u0002\u0002\u00b9\u00b7\u0003",
    "\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002\u00ba\u00bc\u0003",
    "\u0002\u0002\u0002\u00bb\u00b9\u0003\u0002\u0002\u0002\u00bc\u00bd\u0007",
    "\u000f\u0002\u0002\u00bd\u00c5\u0003\u0002\u0002\u0002\u00be\u00bf\u0007",
    "\u001f\u0002\u0002\u00bf\u00c0\u0007\u000e\u0002\u0002\u00c0\u00c5\u0007",
    "\u000f\u0002\u0002\u00c1\u00c2\u0007\u001e\u0002\u0002\u00c2\u00c3\u0007",
    "\u000e\u0002\u0002\u00c3\u00c5\u0007\u000f\u0002\u0002\u00c4\u00b2\u0003",
    "\u0002\u0002\u0002\u00c4\u00be\u0003\u0002\u0002\u0002\u00c4\u00c1\u0003",
    "\u0002\u0002\u0002\u00c5\u0017\u0003\u0002\u0002\u0002\u00c6\u00c9\u0005",
    "\u0004\u0003\u0002\u00c7\u00c9\u0005 \u0011\u0002\u00c8\u00c6\u0003",
    "\u0002\u0002\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c9\u0019\u0003",
    "\u0002\u0002\u0002\u00ca\u00cb\u0007\u0018\u0002\u0002\u00cb\u001b\u0003",
    "\u0002\u0002\u0002\u00cc\u00cd\u0007\u0019\u0002\u0002\u00cd\u001d\u0003",
    "\u0002\u0002\u0002\u00ce\u00cf\u0007\u001a\u0002\u0002\u00cf\u001f\u0003",
    "\u0002\u0002\u0002\u00d0\u00d1\u0007\u0007\u0002\u0002\u00d1\u00d2\u0005",
    "\u0004\u0003\u0002\u00d2!\u0003\u0002\u0002\u0002\u00d3\u00d4\u0007",
    "\u001b\u0002\u0002\u00d4\u00d5\u0005,\u0017\u0002\u00d5\u00d6\u0007",
    "\u001b\u0002\u0002\u00d6#\u0003\u0002\u0002\u0002\u00d7\u00d8\t\u0005",
    "\u0002\u0002\u00d8%\u0003\u0002\u0002\u0002\u00d9\u00da\u0007\u0014",
    "\u0002\u0002\u00da\u00df\u0005(\u0015\u0002\u00db\u00dc\u0007\u0012",
    "\u0002\u0002\u00dc\u00de\u0005(\u0015\u0002\u00dd\u00db\u0003\u0002",
    "\u0002\u0002\u00de\u00e1\u0003\u0002\u0002\u0002\u00df\u00dd\u0003\u0002",
    "\u0002\u0002\u00df\u00e0\u0003\u0002\u0002\u0002\u00e0\u00e2\u0003\u0002",
    "\u0002\u0002\u00e1\u00df\u0003\u0002\u0002\u0002\u00e2\u00e3\u0007\u0015",
    "\u0002\u0002\u00e3\u00e7\u0003\u0002\u0002\u0002\u00e4\u00e5\u0007\u0014",
    "\u0002\u0002\u00e5\u00e7\u0007\u0015\u0002\u0002\u00e6\u00d9\u0003\u0002",
    "\u0002\u0002\u00e6\u00e4\u0003\u0002\u0002\u0002\u00e7\'\u0003\u0002",
    "\u0002\u0002\u00e8\u00e9\u0007 \u0002\u0002\u00e9\u00ea\u0007\u0016",
    "\u0002\u0002\u00ea\u00eb\u0005,\u0017\u0002\u00eb)\u0003\u0002\u0002",
    "\u0002\u00ec\u00ed\u0007\u0011\u0002\u0002\u00ed\u00f2\u0005,\u0017",
    "\u0002\u00ee\u00ef\u0007\u0012\u0002\u0002\u00ef\u00f1\u0005,\u0017",
    "\u0002\u00f0\u00ee\u0003\u0002\u0002\u0002\u00f1\u00f4\u0003\u0002\u0002",
    "\u0002\u00f2\u00f0\u0003\u0002\u0002\u0002\u00f2\u00f3\u0003\u0002\u0002",
    "\u0002\u00f3\u00f5\u0003\u0002\u0002\u0002\u00f4\u00f2\u0003\u0002\u0002",
    "\u0002\u00f5\u00f6\u0007\u0013\u0002\u0002\u00f6\u00fa\u0003\u0002\u0002",
    "\u0002\u00f7\u00f8\u0007\u0011\u0002\u0002\u00f8\u00fa\u0007\u0013\u0002",
    "\u0002\u00f9\u00ec\u0003\u0002\u0002\u0002\u00f9\u00f7\u0003\u0002\u0002",
    "\u0002\u00fa+\u0003\u0002\u0002\u0002\u00fb\u0101\u0007 \u0002\u0002",
    "\u00fc\u0101\t\u0002\u0002\u0002\u00fd\u0101\u0005&\u0014\u0002\u00fe",
    "\u0101\u0005*\u0016\u0002\u00ff\u0101\u0007\u001e\u0002\u0002\u0100",
    "\u00fb\u0003\u0002\u0002\u0002\u0100\u00fc\u0003\u0002\u0002\u0002\u0100",
    "\u00fd\u0003\u0002\u0002\u0002\u0100\u00fe\u0003\u0002\u0002\u0002\u0100",
    "\u00ff\u0003\u0002\u0002\u0002\u0101-\u0003\u0002\u0002\u0002\u0017",
    "D`bjt\u0081\u0086\u009c\u00a3\u00a6\u00aa\u00ae\u00b0\u00b9\u00c4\u00c8",
    "\u00df\u00e6\u00f2\u00f9\u0100"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class JSONFormulaParser extends antlr4.Parser {

    static grammarFileName = "JSONFormula.g4";
    static literalNames = [ null, "'.'", "'^'", "'*'", "'/'", "'&'", "'~'", 
                            "'+'", "'-'", "'&&'", "'||'", "'!'", "'('", 
                            "')'", "'|'", "'['", "','", "']'", "'{'", "'}'", 
                            "':'", "'[?'", "'@'", "'$form'", "'$field'", 
                            "'`'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", 
                             "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", 
                             "SIGNED_INT", "WS" ];
    static ruleNames = [ "formula", "expression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "bracketSpecifier", "chainedBracketSpecifier", 
                         "slice", "functionExpression", "functionArg", "currentNode", 
                         "form", "currentField", "expressionType", "literal", 
                         "identifier", "jsonObject", "jsonObjectPair", "jsonArray", 
                         "jsonValue" ];

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
    			return this.precpred(this._ctx, 20);
    		case 1:
    			return this.precpred(this._ctx, 19);
    		case 2:
    			return this.precpred(this._ctx, 18);
    		case 3:
    			return this.precpred(this._ctx, 17);
    		case 4:
    			return this.precpred(this._ctx, 16);
    		case 5:
    			return this.precpred(this._ctx, 15);
    		case 6:
    			return this.precpred(this._ctx, 6);
    		case 7:
    			return this.precpred(this._ctx, 23);
    		case 8:
    			return this.precpred(this._ctx, 22);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	formula() {
	    let localctx = new FormulaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JSONFormulaParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 44;
	        this.expression(0);
	        this.state = 45;
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
	        this.state = 66;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 48;
	            this.bracketSpecifier();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 49;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            this.match(JSONFormulaParser.T__10);
	            this.state = 51;
	            this.expression(13);
	            break;

	        case 4:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 52;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 53;
	            this.expression(0);
	            this.state = 54;
	            this.match(JSONFormulaParser.T__12);
	            break;

	        case 5:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 56;
	            this.wildcard();
	            break;

	        case 6:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 57;
	            this.multiSelectList();
	            break;

	        case 7:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 58;
	            this.multiSelectHash();
	            break;

	        case 8:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 59;
	            this.literal();
	            break;

	        case 9:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 60;
	            this.functionExpression();
	            break;

	        case 10:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 61;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 11:
	            localctx = new NumberLiteralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 62;
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
	            this.state = 63;
	            this.currentNode();
	            break;

	        case 13:
	            localctx = new FormExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 64;
	            this.form();
	            break;

	        case 14:
	            localctx = new CurrentFieldExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 65;
	            this.currentField();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 96;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 94;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new PowerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 68;
	                    if (!( this.precpred(this._ctx, 20))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
	                    }

	                    this.state = 69;
	                    this.match(JSONFormulaParser.T__1);
	                    this.state = 70;
	                    this.expression(21);
	                    break;

	                case 2:
	                    localctx = new MultDivExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 71;
	                    if (!( this.precpred(this._ctx, 19))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
	                    }
	                    this.state = 72;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << JSONFormulaParser.T__2) | (1 << JSONFormulaParser.T__3) | (1 << JSONFormulaParser.T__4) | (1 << JSONFormulaParser.T__5))) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 73;
	                    this.expression(20);
	                    break;

	                case 3:
	                    localctx = new AddSubtractExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 74;
	                    if (!( this.precpred(this._ctx, 18))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 18)");
	                    }
	                    this.state = 75;
	                    _la = this._input.LA(1);
	                    if(!(_la===JSONFormulaParser.T__6 || _la===JSONFormulaParser.T__7)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 76;
	                    this.expression(19);
	                    break;

	                case 4:
	                    localctx = new ComparisonExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 77;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 78;
	                    this.match(JSONFormulaParser.COMPARATOR);
	                    this.state = 79;
	                    this.expression(18);
	                    break;

	                case 5:
	                    localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 80;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 81;
	                    this.match(JSONFormulaParser.T__8);
	                    this.state = 82;
	                    this.expression(17);
	                    break;

	                case 6:
	                    localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 83;
	                    if (!( this.precpred(this._ctx, 15))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
	                    }
	                    this.state = 84;
	                    this.match(JSONFormulaParser.T__9);
	                    this.state = 85;
	                    this.expression(16);
	                    break;

	                case 7:
	                    localctx = new PipeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 86;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 87;
	                    this.match(JSONFormulaParser.T__13);
	                    this.state = 88;
	                    this.expression(7);
	                    break;

	                case 8:
	                    localctx = new ChainExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 89;
	                    if (!( this.precpred(this._ctx, 23))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
	                    }
	                    this.state = 90;
	                    this.match(JSONFormulaParser.T__0);
	                    this.state = 91;
	                    this.chainedExpression();
	                    break;

	                case 9:
	                    localctx = new BracketedExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 92;
	                    if (!( this.precpred(this._ctx, 22))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
	                    }
	                    this.state = 93;
	                    this.chainedBracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 98;
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
	        this.state = 104;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 99;
	            this.identifier();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 100;
	            this.multiSelectList();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 101;
	            this.multiSelectHash();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 102;
	            this.functionExpression();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 103;
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
	        this.state = 106;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 108;
	        this.match(JSONFormulaParser.T__14);
	        this.state = 109;
	        this.expression(0);
	        this.state = 114;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__15) {
	            this.state = 110;
	            this.match(JSONFormulaParser.T__15);
	            this.state = 111;
	            this.expression(0);
	            this.state = 116;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 117;
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
	    var _la = 0; // Token type
	    try {
	        this.state = 132;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new EmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 119;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 120;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            localctx = new NonEmptyHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 121;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 122;
	            this.keyvalExpr();
	            this.state = 127;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__15) {
	                this.state = 123;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 124;
	                this.keyvalExpr();
	                this.state = 129;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 130;
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
	        this.state = 134;
	        this.identifier();
	        this.state = 135;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 136;
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
	        this.state = 154;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 138;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 139;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            this.state = 140;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 141;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 142;
	            this.match(JSONFormulaParser.T__2);
	            this.state = 143;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 144;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 145;
	            this.slice();
	            this.state = 146;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 148;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 149;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 150;
	            this.match(JSONFormulaParser.T__20);
	            this.state = 151;
	            this.expression(0);
	            this.state = 152;
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
	        this.state = 161;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedBracketContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 156;
	            this.bracketSpecifier();
	            break;

	        case 2:
	            localctx = new ChainedBracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 157;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 158;
	            this.expression(0);
	            this.state = 159;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 164;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (JSONFormulaParser.T__2 - 3)) | (1 << (JSONFormulaParser.T__10 - 3)) | (1 << (JSONFormulaParser.T__11 - 3)) | (1 << (JSONFormulaParser.T__14 - 3)) | (1 << (JSONFormulaParser.T__17 - 3)) | (1 << (JSONFormulaParser.T__20 - 3)) | (1 << (JSONFormulaParser.T__21 - 3)) | (1 << (JSONFormulaParser.T__22 - 3)) | (1 << (JSONFormulaParser.T__23 - 3)) | (1 << (JSONFormulaParser.T__24 - 3)) | (1 << (JSONFormulaParser.RAW_STRING - 3)) | (1 << (JSONFormulaParser.JSON_CONSTANT - 3)) | (1 << (JSONFormulaParser.NAME - 3)) | (1 << (JSONFormulaParser.STRING - 3)) | (1 << (JSONFormulaParser.REAL_OR_EXPONENT_NUMBER - 3)) | (1 << (JSONFormulaParser.SIGNED_INT - 3)))) !== 0)) {
	            this.state = 163;
	            localctx.start = this.expression(0);
	        }

	        this.state = 166;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 168;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (JSONFormulaParser.T__2 - 3)) | (1 << (JSONFormulaParser.T__10 - 3)) | (1 << (JSONFormulaParser.T__11 - 3)) | (1 << (JSONFormulaParser.T__14 - 3)) | (1 << (JSONFormulaParser.T__17 - 3)) | (1 << (JSONFormulaParser.T__20 - 3)) | (1 << (JSONFormulaParser.T__21 - 3)) | (1 << (JSONFormulaParser.T__22 - 3)) | (1 << (JSONFormulaParser.T__23 - 3)) | (1 << (JSONFormulaParser.T__24 - 3)) | (1 << (JSONFormulaParser.RAW_STRING - 3)) | (1 << (JSONFormulaParser.JSON_CONSTANT - 3)) | (1 << (JSONFormulaParser.NAME - 3)) | (1 << (JSONFormulaParser.STRING - 3)) | (1 << (JSONFormulaParser.REAL_OR_EXPONENT_NUMBER - 3)) | (1 << (JSONFormulaParser.SIGNED_INT - 3)))) !== 0)) {
	            this.state = 167;
	            localctx.stop = this.expression(0);
	        }

	        this.state = 174;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.T__19) {
	            this.state = 170;
	            this.match(JSONFormulaParser.T__19);
	            this.state = 172;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (JSONFormulaParser.T__2 - 3)) | (1 << (JSONFormulaParser.T__10 - 3)) | (1 << (JSONFormulaParser.T__11 - 3)) | (1 << (JSONFormulaParser.T__14 - 3)) | (1 << (JSONFormulaParser.T__17 - 3)) | (1 << (JSONFormulaParser.T__20 - 3)) | (1 << (JSONFormulaParser.T__21 - 3)) | (1 << (JSONFormulaParser.T__22 - 3)) | (1 << (JSONFormulaParser.T__23 - 3)) | (1 << (JSONFormulaParser.T__24 - 3)) | (1 << (JSONFormulaParser.RAW_STRING - 3)) | (1 << (JSONFormulaParser.JSON_CONSTANT - 3)) | (1 << (JSONFormulaParser.NAME - 3)) | (1 << (JSONFormulaParser.STRING - 3)) | (1 << (JSONFormulaParser.REAL_OR_EXPONENT_NUMBER - 3)) | (1 << (JSONFormulaParser.SIGNED_INT - 3)))) !== 0)) {
	                this.state = 171;
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
	    var _la = 0; // Token type
	    try {
	        this.state = 194;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 176;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 177;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 178;
	            this.functionArg();
	            this.state = 183;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__15) {
	                this.state = 179;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 180;
	                this.functionArg();
	                this.state = 185;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 186;
	            this.match(JSONFormulaParser.T__12);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 188;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 189;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 190;
	            this.match(JSONFormulaParser.T__12);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 191;
	            this.match(JSONFormulaParser.JSON_CONSTANT);
	            this.state = 192;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 193;
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
	        this.state = 198;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__2:
	        case JSONFormulaParser.T__10:
	        case JSONFormulaParser.T__11:
	        case JSONFormulaParser.T__14:
	        case JSONFormulaParser.T__17:
	        case JSONFormulaParser.T__20:
	        case JSONFormulaParser.T__21:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.T__23:
	        case JSONFormulaParser.T__24:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	        case JSONFormulaParser.SIGNED_INT:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 196;
	            this.expression(0);
	            break;
	        case JSONFormulaParser.T__4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 197;
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
	        this.state = 200;
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



	form() {
	    let localctx = new FormContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, JSONFormulaParser.RULE_form);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 202;
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



	currentField() {
	    let localctx = new CurrentFieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, JSONFormulaParser.RULE_currentField);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 204;
	        this.match(JSONFormulaParser.T__23);
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
	    this.enterRule(localctx, 30, JSONFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 206;
	        this.match(JSONFormulaParser.T__4);
	        this.state = 207;
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
	    this.enterRule(localctx, 32, JSONFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 209;
	        this.match(JSONFormulaParser.T__24);
	        this.state = 210;
	        this.jsonValue();
	        this.state = 211;
	        this.match(JSONFormulaParser.T__24);
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
	    this.enterRule(localctx, 34, JSONFormulaParser.RULE_identifier);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 213;
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
	    this.enterRule(localctx, 36, JSONFormulaParser.RULE_jsonObject);
	    var _la = 0; // Token type
	    try {
	        this.state = 228;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 215;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 216;
	            this.jsonObjectPair();
	            this.state = 221;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__15) {
	                this.state = 217;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 218;
	                this.jsonObjectPair();
	                this.state = 223;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 224;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 226;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 227;
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
	    this.enterRule(localctx, 38, JSONFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 230;
	        this.match(JSONFormulaParser.STRING);
	        this.state = 231;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 232;
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
	    this.enterRule(localctx, 40, JSONFormulaParser.RULE_jsonArray);
	    var _la = 0; // Token type
	    try {
	        this.state = 247;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 234;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 235;
	            this.jsonValue();
	            this.state = 240;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__15) {
	                this.state = 236;
	                this.match(JSONFormulaParser.T__15);
	                this.state = 237;
	                this.jsonValue();
	                this.state = 242;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 243;
	            this.match(JSONFormulaParser.T__16);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 245;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 246;
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
	    this.enterRule(localctx, 42, JSONFormulaParser.RULE_jsonValue);
	    var _la = 0; // Token type
	    try {
	        this.state = 254;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.STRING:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 249;
	            this.match(JSONFormulaParser.STRING);
	            break;
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	        case JSONFormulaParser.SIGNED_INT:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 250;
	            _la = this._input.LA(1);
	            if(!(_la===JSONFormulaParser.REAL_OR_EXPONENT_NUMBER || _la===JSONFormulaParser.SIGNED_INT)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case JSONFormulaParser.T__17:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 251;
	            this.jsonObject();
	            break;
	        case JSONFormulaParser.T__14:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 252;
	            this.jsonArray();
	            break;
	        case JSONFormulaParser.JSON_CONSTANT:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 253;
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
JSONFormulaParser.T__23 = 24;
JSONFormulaParser.T__24 = 25;
JSONFormulaParser.COMPARATOR = 26;
JSONFormulaParser.RAW_STRING = 27;
JSONFormulaParser.JSON_CONSTANT = 28;
JSONFormulaParser.NAME = 29;
JSONFormulaParser.STRING = 30;
JSONFormulaParser.REAL_OR_EXPONENT_NUMBER = 31;
JSONFormulaParser.SIGNED_INT = 32;
JSONFormulaParser.WS = 33;

JSONFormulaParser.RULE_formula = 0;
JSONFormulaParser.RULE_expression = 1;
JSONFormulaParser.RULE_chainedExpression = 2;
JSONFormulaParser.RULE_wildcard = 3;
JSONFormulaParser.RULE_multiSelectList = 4;
JSONFormulaParser.RULE_multiSelectHash = 5;
JSONFormulaParser.RULE_keyvalExpr = 6;
JSONFormulaParser.RULE_bracketSpecifier = 7;
JSONFormulaParser.RULE_chainedBracketSpecifier = 8;
JSONFormulaParser.RULE_slice = 9;
JSONFormulaParser.RULE_functionExpression = 10;
JSONFormulaParser.RULE_functionArg = 11;
JSONFormulaParser.RULE_currentNode = 12;
JSONFormulaParser.RULE_form = 13;
JSONFormulaParser.RULE_currentField = 14;
JSONFormulaParser.RULE_expressionType = 15;
JSONFormulaParser.RULE_literal = 16;
JSONFormulaParser.RULE_identifier = 17;
JSONFormulaParser.RULE_jsonObject = 18;
JSONFormulaParser.RULE_jsonObjectPair = 19;
JSONFormulaParser.RULE_jsonArray = 20;
JSONFormulaParser.RULE_jsonValue = 21;

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

	bracketSpecifier() {
	    return this.getTypedRuleContext(BracketSpecifierContext,0);
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
        this.start = null; // ExpressionContext
        this.stop = null; // ExpressionContext
        this.step = null; // ExpressionContext
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
JSONFormulaParser.ChainedBracketSpecifierContext = ChainedBracketSpecifierContext; 
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

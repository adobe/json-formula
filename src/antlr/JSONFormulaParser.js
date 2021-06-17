// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONFormulaListener from './JSONFormulaListener.js';
import JSONFormulaVisitor from './JSONFormulaVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003%\u012a\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003K\n\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003S\n\u0003",
    "\f\u0003\u000e\u0003V\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0007\tl\n\t\f\t\u000e\to\u000b\t\u0003\n",
    "\u0003\n\u0005\ns\n\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f\u0087\n\f\u0003\f\u0003\f",
    "\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u009a\n\f",
    "\f\f\u000e\f\u009d\u000b\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005",
    "\r\u00a4\n\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0007\u000f\u00ac\n\u000f\f\u000f\u000e\u000f\u00af\u000b",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0007\u0010\u00b7\n\u0010\f\u0010\u000e\u0010\u00ba\u000b\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u00d2\n",
    "\u0012\u0003\u0013\u0005\u0013\u00d5\n\u0013\u0003\u0013\u0003\u0013",
    "\u0005\u0013\u00d9\n\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00dd",
    "\n\u0013\u0005\u0013\u00df\n\u0013\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0007\u0014\u00e6\n\u0014\f\u0014\u000e\u0014",
    "\u00e9\u000b\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0005\u0014\u00f0\n\u0014\u0003\u0015\u0003\u0015\u0005\u0015",
    "\u00f4\n\u0015\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0019\u0003",
    "\u0019\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0007\u001a\u0105",
    "\n\u001a\f\u001a\u000e\u001a\u0108\u000b\u001a\u0003\u001a\u0003\u001a",
    "\u0003\u001a\u0003\u001a\u0005\u001a\u010e\n\u001a\u0003\u001b\u0003",
    "\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003\u001c\u0003",
    "\u001c\u0007\u001c\u0118\n\u001c\f\u001c\u000e\u001c\u011b\u000b\u001c",
    "\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0005\u001c\u0121\n",
    "\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0005",
    "\u001d\u0128\n\u001d\u0003\u001d\u0002\u0005\u0004\u0010\u0016\u001e",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c",
    "\u001e \"$&(*,.02468\u0002\u0006\u0003\u0002\u0005\u0006\u0004\u0002",
    "\u0005\u000b\u001f\u001f\u0004\u0002\u001e\u001e!#\u0004\u0002\u001b",
    "\u001b$$\u0002\u0140\u0002:\u0003\u0002\u0002\u0002\u0004J\u0003\u0002",
    "\u0002\u0002\u0006W\u0003\u0002\u0002\u0002\bY\u0003\u0002\u0002\u0002",
    "\n[\u0003\u0002\u0002\u0002\f]\u0003\u0002\u0002\u0002\u000eb\u0003",
    "\u0002\u0002\u0002\u0010d\u0003\u0002\u0002\u0002\u0012r\u0003\u0002",
    "\u0002\u0002\u0014t\u0003\u0002\u0002\u0002\u0016\u0086\u0003\u0002",
    "\u0002\u0002\u0018\u00a3\u0003\u0002\u0002\u0002\u001a\u00a5\u0003\u0002",
    "\u0002\u0002\u001c\u00a7\u0003\u0002\u0002\u0002\u001e\u00b2\u0003\u0002",
    "\u0002\u0002 \u00bd\u0003\u0002\u0002\u0002\"\u00d1\u0003\u0002\u0002",
    "\u0002$\u00d4\u0003\u0002\u0002\u0002&\u00ef\u0003\u0002\u0002\u0002",
    "(\u00f3\u0003\u0002\u0002\u0002*\u00f5\u0003\u0002\u0002\u0002,\u00f7",
    "\u0003\u0002\u0002\u0002.\u00fa\u0003\u0002\u0002\u00020\u00fe\u0003",
    "\u0002\u0002\u00022\u010d\u0003\u0002\u0002\u00024\u010f\u0003\u0002",
    "\u0002\u00026\u0120\u0003\u0002\u0002\u00028\u0127\u0003\u0002\u0002",
    "\u0002:;\u0005\u0004\u0003\u0002;<\u0007\u0002\u0002\u0003<\u0003\u0003",
    "\u0002\u0002\u0002=>\b\u0003\u0001\u0002>K\u0007\u001b\u0002\u0002?",
    "K\u0007\u001c\u0002\u0002@K\u0007 \u0002\u0002AB\u0005\u0006\u0004\u0002",
    "BC\u0005\u0004\u0003\u0007CK\u0003\u0002\u0002\u0002DE\u0007\u0003\u0002",
    "\u0002EF\u0005\u0004\u0003\u0002FG\u0007\u0004\u0002\u0002GK\u0003\u0002",
    "\u0002\u0002HK\u0005\f\u0007\u0002IK\u0005\u0016\f\u0002J=\u0003\u0002",
    "\u0002\u0002J?\u0003\u0002\u0002\u0002J@\u0003\u0002\u0002\u0002JA\u0003",
    "\u0002\u0002\u0002JD\u0003\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002",
    "JI\u0003\u0002\u0002\u0002KT\u0003\u0002\u0002\u0002LM\f\b\u0002\u0002",
    "MN\u0005\b\u0005\u0002NO\u0005\u0004\u0003\tOS\u0003\u0002\u0002\u0002",
    "PQ\f\u0006\u0002\u0002QS\u0005\n\u0006\u0002RL\u0003\u0002\u0002\u0002",
    "RP\u0003\u0002\u0002\u0002SV\u0003\u0002\u0002\u0002TR\u0003\u0002\u0002",
    "\u0002TU\u0003\u0002\u0002\u0002U\u0005\u0003\u0002\u0002\u0002VT\u0003",
    "\u0002\u0002\u0002WX\t\u0002\u0002\u0002X\u0007\u0003\u0002\u0002\u0002",
    "YZ\t\u0003\u0002\u0002Z\t\u0003\u0002\u0002\u0002[\\\u0007\f\u0002\u0002",
    "\\\u000b\u0003\u0002\u0002\u0002]^\u0007\u001d\u0002\u0002^_\u0007\u0003",
    "\u0002\u0002_`\u0005\u0012\n\u0002`a\u0007\u0004\u0002\u0002a\r\u0003",
    "\u0002\u0002\u0002bc\u0005\u0004\u0003\u0002c\u000f\u0003\u0002\u0002",
    "\u0002de\b\t\u0001\u0002ef\u0005\u000e\b\u0002fm\u0003\u0002\u0002\u0002",
    "gh\f\u0003\u0002\u0002hi\u0005\u0014\u000b\u0002ij\u0005\u000e\b\u0002",
    "jl\u0003\u0002\u0002\u0002kg\u0003\u0002\u0002\u0002lo\u0003\u0002\u0002",
    "\u0002mk\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002\u0002n\u0011\u0003",
    "\u0002\u0002\u0002om\u0003\u0002\u0002\u0002ps\u0003\u0002\u0002\u0002",
    "qs\u0005\u0010\t\u0002rp\u0003\u0002\u0002\u0002rq\u0003\u0002\u0002",
    "\u0002s\u0013\u0003\u0002\u0002\u0002tu\u0007\r\u0002\u0002u\u0015\u0003",
    "\u0002\u0002\u0002vw\b\f\u0001\u0002w\u0087\u0005\"\u0012\u0002x\u0087",
    "\u00050\u0019\u0002yz\u0007\u0011\u0002\u0002z\u0087\u0005\u0016\f\f",
    "{|\u0007\u0003\u0002\u0002|}\u0005\u0016\f\u0002}~\u0007\u0004\u0002",
    "\u0002~\u0087\u0003\u0002\u0002\u0002\u007f\u0087\u0005\u001a\u000e",
    "\u0002\u0080\u0087\u0005\u001c\u000f\u0002\u0081\u0087\u0005\u001e\u0010",
    "\u0002\u0082\u0087\u0005.\u0018\u0002\u0083\u0087\u0005&\u0014\u0002",
    "\u0084\u0087\u0007 \u0002\u0002\u0085\u0087\u0005*\u0016\u0002\u0086",
    "v\u0003\u0002\u0002\u0002\u0086x\u0003\u0002\u0002\u0002\u0086y\u0003",
    "\u0002\u0002\u0002\u0086{\u0003\u0002\u0002\u0002\u0086\u007f\u0003",
    "\u0002\u0002\u0002\u0086\u0080\u0003\u0002\u0002\u0002\u0086\u0081\u0003",
    "\u0002\u0002\u0002\u0086\u0082\u0003\u0002\u0002\u0002\u0086\u0083\u0003",
    "\u0002\u0002\u0002\u0086\u0084\u0003\u0002\u0002\u0002\u0086\u0085\u0003",
    "\u0002\u0002\u0002\u0087\u009b\u0003\u0002\u0002\u0002\u0088\u0089\f",
    "\u0010\u0002\u0002\u0089\u008a\u0007\u001f\u0002\u0002\u008a\u009a\u0005",
    "\u0016\f\u0011\u008b\u008c\f\u000f\u0002\u0002\u008c\u008d\u0007\u000f",
    "\u0002\u0002\u008d\u009a\u0005\u0016\f\u0010\u008e\u008f\f\u000e\u0002",
    "\u0002\u008f\u0090\u0007\u0010\u0002\u0002\u0090\u009a\u0005\u0016\f",
    "\u000f\u0091\u0092\f\u0005\u0002\u0002\u0092\u0093\u0007\u0012\u0002",
    "\u0002\u0093\u009a\u0005\u0016\f\u0006\u0094\u0095\f\u0013\u0002\u0002",
    "\u0095\u0096\u0007\u000e\u0002\u0002\u0096\u009a\u0005\u0018\r\u0002",
    "\u0097\u0098\f\u0012\u0002\u0002\u0098\u009a\u0005\"\u0012\u0002\u0099",
    "\u0088\u0003\u0002\u0002\u0002\u0099\u008b\u0003\u0002\u0002\u0002\u0099",
    "\u008e\u0003\u0002\u0002\u0002\u0099\u0091\u0003\u0002\u0002\u0002\u0099",
    "\u0094\u0003\u0002\u0002\u0002\u0099\u0097\u0003\u0002\u0002\u0002\u009a",
    "\u009d\u0003\u0002\u0002\u0002\u009b\u0099\u0003\u0002\u0002\u0002\u009b",
    "\u009c\u0003\u0002\u0002\u0002\u009c\u0017\u0003\u0002\u0002\u0002\u009d",
    "\u009b\u0003\u0002\u0002\u0002\u009e\u00a4\u00050\u0019\u0002\u009f",
    "\u00a4\u0005\u001c\u000f\u0002\u00a0\u00a4\u0005\u001e\u0010\u0002\u00a1",
    "\u00a4\u0005&\u0014\u0002\u00a2\u00a4\u0005\u001a\u000e\u0002\u00a3",
    "\u009e\u0003\u0002\u0002\u0002\u00a3\u009f\u0003\u0002\u0002\u0002\u00a3",
    "\u00a0\u0003\u0002\u0002\u0002\u00a3\u00a1\u0003\u0002\u0002\u0002\u00a3",
    "\u00a2\u0003\u0002\u0002\u0002\u00a4\u0019\u0003\u0002\u0002\u0002\u00a5",
    "\u00a6\u0007\t\u0002\u0002\u00a6\u001b\u0003\u0002\u0002\u0002\u00a7",
    "\u00a8\u0007\u0013\u0002\u0002\u00a8\u00ad\u0005\u0016\f\u0002\u00a9",
    "\u00aa\u0007\r\u0002\u0002\u00aa\u00ac\u0005\u0016\f\u0002\u00ab\u00a9",
    "\u0003\u0002\u0002\u0002\u00ac\u00af\u0003\u0002\u0002\u0002\u00ad\u00ab",
    "\u0003\u0002\u0002\u0002\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae\u00b0",
    "\u0003\u0002\u0002\u0002\u00af\u00ad\u0003\u0002\u0002\u0002\u00b0\u00b1",
    "\u0007\u0014\u0002\u0002\u00b1\u001d\u0003\u0002\u0002\u0002\u00b2\u00b3",
    "\u0007\u0015\u0002\u0002\u00b3\u00b8\u0005 \u0011\u0002\u00b4\u00b5",
    "\u0007\r\u0002\u0002\u00b5\u00b7\u0005 \u0011\u0002\u00b6\u00b4\u0003",
    "\u0002\u0002\u0002\u00b7\u00ba\u0003\u0002\u0002\u0002\u00b8\u00b6\u0003",
    "\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9\u00bb\u0003",
    "\u0002\u0002\u0002\u00ba\u00b8\u0003\u0002\u0002\u0002\u00bb\u00bc\u0007",
    "\u0016\u0002\u0002\u00bc\u001f\u0003\u0002\u0002\u0002\u00bd\u00be\u0005",
    "0\u0019\u0002\u00be\u00bf\u0007\u0017\u0002\u0002\u00bf\u00c0\u0005",
    "\u0016\f\u0002\u00c0!\u0003\u0002\u0002\u0002\u00c1\u00c2\u0007\u0013",
    "\u0002\u0002\u00c2\u00c3\u0007\u001b\u0002\u0002\u00c3\u00d2\u0007\u0014",
    "\u0002\u0002\u00c4\u00c5\u0007\u0013\u0002\u0002\u00c5\u00c6\u0007\t",
    "\u0002\u0002\u00c6\u00d2\u0007\u0014\u0002\u0002\u00c7\u00c8\u0007\u0013",
    "\u0002\u0002\u00c8\u00c9\u0005$\u0013\u0002\u00c9\u00ca\u0007\u0014",
    "\u0002\u0002\u00ca\u00d2\u0003\u0002\u0002\u0002\u00cb\u00cc\u0007\u0013",
    "\u0002\u0002\u00cc\u00d2\u0007\u0014\u0002\u0002\u00cd\u00ce\u0007\u0018",
    "\u0002\u0002\u00ce\u00cf\u0005\u0016\f\u0002\u00cf\u00d0\u0007\u0014",
    "\u0002\u0002\u00d0\u00d2\u0003\u0002\u0002\u0002\u00d1\u00c1\u0003\u0002",
    "\u0002\u0002\u00d1\u00c4\u0003\u0002\u0002\u0002\u00d1\u00c7\u0003\u0002",
    "\u0002\u0002\u00d1\u00cb\u0003\u0002\u0002\u0002\u00d1\u00cd\u0003\u0002",
    "\u0002\u0002\u00d2#\u0003\u0002\u0002\u0002\u00d3\u00d5\u0007\u001b",
    "\u0002\u0002\u00d4\u00d3\u0003\u0002\u0002\u0002\u00d4\u00d5\u0003\u0002",
    "\u0002\u0002\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6\u00d8\u0007\u0017",
    "\u0002\u0002\u00d7\u00d9\u0007\u001b\u0002\u0002\u00d8\u00d7\u0003\u0002",
    "\u0002\u0002\u00d8\u00d9\u0003\u0002\u0002\u0002\u00d9\u00de\u0003\u0002",
    "\u0002\u0002\u00da\u00dc\u0007\u0017\u0002\u0002\u00db\u00dd\u0007\u001b",
    "\u0002\u0002\u00dc\u00db\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003\u0002",
    "\u0002\u0002\u00dd\u00df\u0003\u0002\u0002\u0002\u00de\u00da\u0003\u0002",
    "\u0002\u0002\u00de\u00df\u0003\u0002\u0002\u0002\u00df%\u0003\u0002",
    "\u0002\u0002\u00e0\u00e1\u0007\"\u0002\u0002\u00e1\u00e2\u0007\u0003",
    "\u0002\u0002\u00e2\u00e7\u0005(\u0015\u0002\u00e3\u00e4\u0007\r\u0002",
    "\u0002\u00e4\u00e6\u0005(\u0015\u0002\u00e5\u00e3\u0003\u0002\u0002",
    "\u0002\u00e6\u00e9\u0003\u0002\u0002\u0002\u00e7\u00e5\u0003\u0002\u0002",
    "\u0002\u00e7\u00e8\u0003\u0002\u0002\u0002\u00e8\u00ea\u0003\u0002\u0002",
    "\u0002\u00e9\u00e7\u0003\u0002\u0002\u0002\u00ea\u00eb\u0007\u0004\u0002",
    "\u0002\u00eb\u00f0\u0003\u0002\u0002\u0002\u00ec\u00ed\u0007\"\u0002",
    "\u0002\u00ed\u00ee\u0007\u0003\u0002\u0002\u00ee\u00f0\u0007\u0004\u0002",
    "\u0002\u00ef\u00e0\u0003\u0002\u0002\u0002\u00ef\u00ec\u0003\u0002\u0002",
    "\u0002\u00f0\'\u0003\u0002\u0002\u0002\u00f1\u00f4\u0005\u0016\f\u0002",
    "\u00f2\u00f4\u0005,\u0017\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002",
    "\u00f3\u00f2\u0003\u0002\u0002\u0002\u00f4)\u0003\u0002\u0002\u0002",
    "\u00f5\u00f6\u0007\u0019\u0002\u0002\u00f6+\u0003\u0002\u0002\u0002",
    "\u00f7\u00f8\u0007\b\u0002\u0002\u00f8\u00f9\u0005\u0016\f\u0002\u00f9",
    "-\u0003\u0002\u0002\u0002\u00fa\u00fb\u0007\u001a\u0002\u0002\u00fb",
    "\u00fc\u00058\u001d\u0002\u00fc\u00fd\u0007\u001a\u0002\u0002\u00fd",
    "/\u0003\u0002\u0002\u0002\u00fe\u00ff\t\u0004\u0002\u0002\u00ff1\u0003",
    "\u0002\u0002\u0002\u0100\u0101\u0007\u0015\u0002\u0002\u0101\u0106\u0005",
    "4\u001b\u0002\u0102\u0103\u0007\r\u0002\u0002\u0103\u0105\u00054\u001b",
    "\u0002\u0104\u0102\u0003\u0002\u0002\u0002\u0105\u0108\u0003\u0002\u0002",
    "\u0002\u0106\u0104\u0003\u0002\u0002\u0002\u0106\u0107\u0003\u0002\u0002",
    "\u0002\u0107\u0109\u0003\u0002\u0002\u0002\u0108\u0106\u0003\u0002\u0002",
    "\u0002\u0109\u010a\u0007\u0016\u0002\u0002\u010a\u010e\u0003\u0002\u0002",
    "\u0002\u010b\u010c\u0007\u0015\u0002\u0002\u010c\u010e\u0007\u0016\u0002",
    "\u0002\u010d\u0100\u0003\u0002\u0002\u0002\u010d\u010b\u0003\u0002\u0002",
    "\u0002\u010e3\u0003\u0002\u0002\u0002\u010f\u0110\u0007#\u0002\u0002",
    "\u0110\u0111\u0007\u0017\u0002\u0002\u0111\u0112\u00058\u001d\u0002",
    "\u01125\u0003\u0002\u0002\u0002\u0113\u0114\u0007\u0013\u0002\u0002",
    "\u0114\u0119\u00058\u001d\u0002\u0115\u0116\u0007\r\u0002\u0002\u0116",
    "\u0118\u00058\u001d\u0002\u0117\u0115\u0003\u0002\u0002\u0002\u0118",
    "\u011b\u0003\u0002\u0002\u0002\u0119\u0117\u0003\u0002\u0002\u0002\u0119",
    "\u011a\u0003\u0002\u0002\u0002\u011a\u011c\u0003\u0002\u0002\u0002\u011b",
    "\u0119\u0003\u0002\u0002\u0002\u011c\u011d\u0007\u0014\u0002\u0002\u011d",
    "\u0121\u0003\u0002\u0002\u0002\u011e\u011f\u0007\u0013\u0002\u0002\u011f",
    "\u0121\u0007\u0014\u0002\u0002\u0120\u0113\u0003\u0002\u0002\u0002\u0120",
    "\u011e\u0003\u0002\u0002\u0002\u01217\u0003\u0002\u0002\u0002\u0122",
    "\u0128\u0007#\u0002\u0002\u0123\u0128\t\u0005\u0002\u0002\u0124\u0128",
    "\u00052\u001a\u0002\u0125\u0128\u00056\u001c\u0002\u0126\u0128\u0007",
    "!\u0002\u0002\u0127\u0122\u0003\u0002\u0002\u0002\u0127\u0123\u0003",
    "\u0002\u0002\u0002\u0127\u0124\u0003\u0002\u0002\u0002\u0127\u0125\u0003",
    "\u0002\u0002\u0002\u0127\u0126\u0003\u0002\u0002\u0002\u01289\u0003",
    "\u0002\u0002\u0002\u001aJRTmr\u0086\u0099\u009b\u00a3\u00ad\u00b8\u00d1",
    "\u00d4\u00d8\u00dc\u00de\u00e7\u00ef\u00f3\u0106\u010d\u0119\u0120\u0127"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class JSONFormulaParser extends antlr4.Parser {

    static grammarFileName = "JSONFormula.g4";
    static literalNames = [ null, "'('", "')'", "'+'", "'-'", "'<>'", "'&'", 
                            "'*'", "'/'", "'^'", "'%'", "','", "'.'", "'&&'", 
                            "'||'", "'!'", "'|'", "'['", "']'", "'{'", "'}'", 
                            "':'", "'[?'", "'@'", "'`'", null, null, null, 
                            "'$'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, "SIGNED_INT", "NUMBER", "FUNCTIONS", 
                             "ROOT", "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", 
                             "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", 
                             "WS" ];
    static ruleNames = [ "formula", "expression", "unary_op", "binary_op", 
                         "postfix_op", "function_call", "parameter", "nonempty_expr_list", 
                         "expression_list", "parm_separator", "jmesPathExpression", 
                         "chainedExpression", "wildcard", "multiSelectList", 
                         "multiSelectHash", "keyvalExpr", "bracketSpecifier", 
                         "slice", "functionExpression", "functionArg", "currentNode", 
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
    	case 7:
    	    		return this.nonempty_expr_list_sempred(localctx, predIndex);
    	case 10:
    	    		return this.jmesPathExpression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 6);
    		case 1:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    nonempty_expr_list_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 2:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    jmesPathExpression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 3:
    			return this.precpred(this._ctx, 14);
    		case 4:
    			return this.precpred(this._ctx, 13);
    		case 5:
    			return this.precpred(this._ctx, 12);
    		case 6:
    			return this.precpred(this._ctx, 3);
    		case 7:
    			return this.precpred(this._ctx, 17);
    		case 8:
    			return this.precpred(this._ctx, 16);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	formula() {
	    let localctx = new FormulaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JSONFormulaParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 56;
	        this.expression(0);
	        this.state = 57;
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
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 72;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new TopLevelIntContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 60;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            break;

	        case 2:
	            localctx = new TopLevelNumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 61;
	            this.match(JSONFormulaParser.NUMBER);
	            break;

	        case 3:
	            localctx = new TopLevelStringContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 62;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 4:
	            localctx = new UnaryExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 63;
	            this.unary_op();
	            this.state = 64;
	            this.expression(5);
	            break;

	        case 5:
	            localctx = new BraceExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 66;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 67;
	            this.expression(0);
	            this.state = 68;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 6:
	            localctx = new FunctionCallContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 70;
	            this.function_call();
	            break;

	        case 7:
	            localctx = new JmesPathContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 71;
	            this.jmesPathExpression(0);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 82;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 80;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 74;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 75;
	                    this.binary_op();
	                    this.state = 76;
	                    this.expression(7);
	                    break;

	                case 2:
	                    localctx = new PostfixContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 78;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 79;
	                    this.postfix_op();
	                    break;

	                } 
	            }
	            this.state = 84;
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



	unary_op() {
	    let localctx = new Unary_opContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, JSONFormulaParser.RULE_unary_op);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 85;
	        _la = this._input.LA(1);
	        if(!(_la===JSONFormulaParser.T__2 || _la===JSONFormulaParser.T__3)) {
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



	binary_op() {
	    let localctx = new Binary_opContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, JSONFormulaParser.RULE_binary_op);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 87;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << JSONFormulaParser.T__2) | (1 << JSONFormulaParser.T__3) | (1 << JSONFormulaParser.T__4) | (1 << JSONFormulaParser.T__5) | (1 << JSONFormulaParser.T__6) | (1 << JSONFormulaParser.T__7) | (1 << JSONFormulaParser.T__8) | (1 << JSONFormulaParser.COMPARATOR))) !== 0))) {
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



	postfix_op() {
	    let localctx = new Postfix_opContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, JSONFormulaParser.RULE_postfix_op);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 89;
	        this.match(JSONFormulaParser.T__9);
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



	function_call() {
	    let localctx = new Function_callContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, JSONFormulaParser.RULE_function_call);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 91;
	        this.match(JSONFormulaParser.FUNCTIONS);
	        this.state = 92;
	        this.match(JSONFormulaParser.T__0);
	        this.state = 93;
	        this.expression_list();
	        this.state = 94;
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



	parameter() {
	    let localctx = new ParameterContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, JSONFormulaParser.RULE_parameter);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 96;
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


	nonempty_expr_list(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Nonempty_expr_listContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 14;
	    this.enterRecursionRule(localctx, 14, JSONFormulaParser.RULE_nonempty_expr_list, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 99;
	        this.parameter();
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 107;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new Nonempty_expr_listContext(this, _parentctx, _parentState);
	                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_nonempty_expr_list);
	                this.state = 101;
	                if (!( this.precpred(this._ctx, 1))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                }
	                this.state = 102;
	                this.parm_separator();
	                this.state = 103;
	                this.parameter(); 
	            }
	            this.state = 109;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
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



	expression_list() {
	    let localctx = new Expression_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, JSONFormulaParser.RULE_expression_list);
	    try {
	        this.state = 112;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__1:
	            this.enterOuterAlt(localctx, 1);

	            break;
	        case JSONFormulaParser.T__0:
	        case JSONFormulaParser.T__2:
	        case JSONFormulaParser.T__3:
	        case JSONFormulaParser.T__6:
	        case JSONFormulaParser.T__14:
	        case JSONFormulaParser.T__16:
	        case JSONFormulaParser.T__18:
	        case JSONFormulaParser.T__21:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.T__23:
	        case JSONFormulaParser.SIGNED_INT:
	        case JSONFormulaParser.NUMBER:
	        case JSONFormulaParser.FUNCTIONS:
	        case JSONFormulaParser.ROOT:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 111;
	            this.nonempty_expr_list(0);
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



	parm_separator() {
	    let localctx = new Parm_separatorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, JSONFormulaParser.RULE_parm_separator);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 114;
	        this.match(JSONFormulaParser.T__10);
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


	jmesPathExpression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new JmesPathExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 20;
	    this.enterRecursionRule(localctx, 20, JSONFormulaParser.RULE_jmesPathExpression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 132;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 117;
	            this.bracketSpecifier();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 118;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 119;
	            this.match(JSONFormulaParser.T__14);
	            this.state = 120;
	            this.jmesPathExpression(10);
	            break;

	        case 4:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 121;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 122;
	            this.jmesPathExpression(0);
	            this.state = 123;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 5:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 125;
	            this.wildcard();
	            break;

	        case 6:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 126;
	            this.multiSelectList();
	            break;

	        case 7:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 127;
	            this.multiSelectHash();
	            break;

	        case 8:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 128;
	            this.literal();
	            break;

	        case 9:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 129;
	            this.functionExpression();
	            break;

	        case 10:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 130;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 11:
	            localctx = new CurrentNodeExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 131;
	            this.currentNode();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 153;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 151;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ComparisonExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 134;
	                    if (!( this.precpred(this._ctx, 14))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
	                    }
	                    this.state = 135;
	                    this.match(JSONFormulaParser.COMPARATOR);
	                    this.state = 136;
	                    this.jmesPathExpression(15);
	                    break;

	                case 2:
	                    localctx = new AndExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 137;
	                    if (!( this.precpred(this._ctx, 13))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
	                    }
	                    this.state = 138;
	                    this.match(JSONFormulaParser.T__12);
	                    this.state = 139;
	                    this.jmesPathExpression(14);
	                    break;

	                case 3:
	                    localctx = new OrExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 140;
	                    if (!( this.precpred(this._ctx, 12))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
	                    }
	                    this.state = 141;
	                    this.match(JSONFormulaParser.T__13);
	                    this.state = 142;
	                    this.jmesPathExpression(13);
	                    break;

	                case 4:
	                    localctx = new PipeExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 143;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 144;
	                    this.match(JSONFormulaParser.T__15);
	                    this.state = 145;
	                    this.jmesPathExpression(4);
	                    break;

	                case 5:
	                    localctx = new ChainExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 146;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 147;
	                    this.match(JSONFormulaParser.T__11);
	                    this.state = 148;
	                    this.chainedExpression();
	                    break;

	                case 6:
	                    localctx = new BracketedExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 149;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 150;
	                    this.bracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 155;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
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
	    this.enterRule(localctx, 22, JSONFormulaParser.RULE_chainedExpression);
	    try {
	        this.state = 161;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedIdentifierContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 156;
	            this.identifier();
	            break;

	        case 2:
	            localctx = new ChainedMultiSelectListContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 157;
	            this.multiSelectList();
	            break;

	        case 3:
	            localctx = new ChainedMultiSelectHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 158;
	            this.multiSelectHash();
	            break;

	        case 4:
	            localctx = new ChainedFunctionExpressionContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 159;
	            this.functionExpression();
	            break;

	        case 5:
	            localctx = new ChainedWildcardContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 160;
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
	    this.enterRule(localctx, 24, JSONFormulaParser.RULE_wildcard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 163;
	        this.match(JSONFormulaParser.T__6);
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
	    this.enterRule(localctx, 26, JSONFormulaParser.RULE_multiSelectList);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 165;
	        this.match(JSONFormulaParser.T__16);
	        this.state = 166;
	        this.jmesPathExpression(0);
	        this.state = 171;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__10) {
	            this.state = 167;
	            this.match(JSONFormulaParser.T__10);
	            this.state = 168;
	            this.jmesPathExpression(0);
	            this.state = 173;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 174;
	        this.match(JSONFormulaParser.T__17);
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
	    this.enterRule(localctx, 28, JSONFormulaParser.RULE_multiSelectHash);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 176;
	        this.match(JSONFormulaParser.T__18);
	        this.state = 177;
	        this.keyvalExpr();
	        this.state = 182;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__10) {
	            this.state = 178;
	            this.match(JSONFormulaParser.T__10);
	            this.state = 179;
	            this.keyvalExpr();
	            this.state = 184;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 185;
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



	keyvalExpr() {
	    let localctx = new KeyvalExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, JSONFormulaParser.RULE_keyvalExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 187;
	        this.identifier();
	        this.state = 188;
	        this.match(JSONFormulaParser.T__20);
	        this.state = 189;
	        this.jmesPathExpression(0);
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
	    this.enterRule(localctx, 32, JSONFormulaParser.RULE_bracketSpecifier);
	    try {
	        this.state = 207;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 191;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 192;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            this.state = 193;
	            this.match(JSONFormulaParser.T__17);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 194;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 195;
	            this.match(JSONFormulaParser.T__6);
	            this.state = 196;
	            this.match(JSONFormulaParser.T__17);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 197;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 198;
	            this.slice();
	            this.state = 199;
	            this.match(JSONFormulaParser.T__17);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 201;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 202;
	            this.match(JSONFormulaParser.T__17);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 203;
	            this.match(JSONFormulaParser.T__21);
	            this.state = 204;
	            this.jmesPathExpression(0);
	            this.state = 205;
	            this.match(JSONFormulaParser.T__17);
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
	    this.enterRule(localctx, 34, JSONFormulaParser.RULE_slice);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 210;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 209;
	            localctx.start = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 212;
	        this.match(JSONFormulaParser.T__20);
	        this.state = 214;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 213;
	            localctx.stop = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 220;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.T__20) {
	            this.state = 216;
	            this.match(JSONFormulaParser.T__20);
	            this.state = 218;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===JSONFormulaParser.SIGNED_INT) {
	                this.state = 217;
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
	    this.enterRule(localctx, 36, JSONFormulaParser.RULE_functionExpression);
	    var _la = 0; // Token type
	    try {
	        this.state = 237;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 222;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 223;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 224;
	            this.functionArg();
	            this.state = 229;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__10) {
	                this.state = 225;
	                this.match(JSONFormulaParser.T__10);
	                this.state = 226;
	                this.functionArg();
	                this.state = 231;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 232;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 234;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 235;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 236;
	            this.match(JSONFormulaParser.T__1);
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
	    this.enterRule(localctx, 38, JSONFormulaParser.RULE_functionArg);
	    try {
	        this.state = 241;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__0:
	        case JSONFormulaParser.T__6:
	        case JSONFormulaParser.T__14:
	        case JSONFormulaParser.T__16:
	        case JSONFormulaParser.T__18:
	        case JSONFormulaParser.T__21:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.T__23:
	        case JSONFormulaParser.ROOT:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 239;
	            this.jmesPathExpression(0);
	            break;
	        case JSONFormulaParser.T__5:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 240;
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
	    this.enterRule(localctx, 40, JSONFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 243;
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



	expressionType() {
	    let localctx = new ExpressionTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, JSONFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 245;
	        this.match(JSONFormulaParser.T__5);
	        this.state = 246;
	        this.jmesPathExpression(0);
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
	    this.enterRule(localctx, 44, JSONFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 248;
	        this.match(JSONFormulaParser.T__23);
	        this.state = 249;
	        this.jsonValue();
	        this.state = 250;
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



	identifier() {
	    let localctx = new IdentifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, JSONFormulaParser.RULE_identifier);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 252;
	        _la = this._input.LA(1);
	        if(!(((((_la - 28)) & ~0x1f) == 0 && ((1 << (_la - 28)) & ((1 << (JSONFormulaParser.ROOT - 28)) | (1 << (JSONFormulaParser.JSON_CONSTANT - 28)) | (1 << (JSONFormulaParser.NAME - 28)) | (1 << (JSONFormulaParser.STRING - 28)))) !== 0))) {
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
	    this.enterRule(localctx, 48, JSONFormulaParser.RULE_jsonObject);
	    var _la = 0; // Token type
	    try {
	        this.state = 267;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 254;
	            this.match(JSONFormulaParser.T__18);
	            this.state = 255;
	            this.jsonObjectPair();
	            this.state = 260;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__10) {
	                this.state = 256;
	                this.match(JSONFormulaParser.T__10);
	                this.state = 257;
	                this.jsonObjectPair();
	                this.state = 262;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 263;
	            this.match(JSONFormulaParser.T__19);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 265;
	            this.match(JSONFormulaParser.T__18);
	            this.state = 266;
	            this.match(JSONFormulaParser.T__19);
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
	    this.enterRule(localctx, 50, JSONFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 269;
	        this.match(JSONFormulaParser.STRING);
	        this.state = 270;
	        this.match(JSONFormulaParser.T__20);
	        this.state = 271;
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
	    this.enterRule(localctx, 52, JSONFormulaParser.RULE_jsonArray);
	    var _la = 0; // Token type
	    try {
	        this.state = 286;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 273;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 274;
	            this.jsonValue();
	            this.state = 279;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__10) {
	                this.state = 275;
	                this.match(JSONFormulaParser.T__10);
	                this.state = 276;
	                this.jsonValue();
	                this.state = 281;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 282;
	            this.match(JSONFormulaParser.T__17);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 284;
	            this.match(JSONFormulaParser.T__16);
	            this.state = 285;
	            this.match(JSONFormulaParser.T__17);
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
	    this.enterRule(localctx, 54, JSONFormulaParser.RULE_jsonValue);
	    var _la = 0; // Token type
	    try {
	        this.state = 293;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.STRING:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 288;
	            this.match(JSONFormulaParser.STRING);
	            break;
	        case JSONFormulaParser.SIGNED_INT:
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 289;
	            _la = this._input.LA(1);
	            if(!(_la===JSONFormulaParser.SIGNED_INT || _la===JSONFormulaParser.REAL_OR_EXPONENT_NUMBER)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case JSONFormulaParser.T__18:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 290;
	            this.jsonObject();
	            break;
	        case JSONFormulaParser.T__16:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 291;
	            this.jsonArray();
	            break;
	        case JSONFormulaParser.JSON_CONSTANT:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 292;
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
JSONFormulaParser.SIGNED_INT = 25;
JSONFormulaParser.NUMBER = 26;
JSONFormulaParser.FUNCTIONS = 27;
JSONFormulaParser.ROOT = 28;
JSONFormulaParser.COMPARATOR = 29;
JSONFormulaParser.RAW_STRING = 30;
JSONFormulaParser.JSON_CONSTANT = 31;
JSONFormulaParser.NAME = 32;
JSONFormulaParser.STRING = 33;
JSONFormulaParser.REAL_OR_EXPONENT_NUMBER = 34;
JSONFormulaParser.WS = 35;

JSONFormulaParser.RULE_formula = 0;
JSONFormulaParser.RULE_expression = 1;
JSONFormulaParser.RULE_unary_op = 2;
JSONFormulaParser.RULE_binary_op = 3;
JSONFormulaParser.RULE_postfix_op = 4;
JSONFormulaParser.RULE_function_call = 5;
JSONFormulaParser.RULE_parameter = 6;
JSONFormulaParser.RULE_nonempty_expr_list = 7;
JSONFormulaParser.RULE_expression_list = 8;
JSONFormulaParser.RULE_parm_separator = 9;
JSONFormulaParser.RULE_jmesPathExpression = 10;
JSONFormulaParser.RULE_chainedExpression = 11;
JSONFormulaParser.RULE_wildcard = 12;
JSONFormulaParser.RULE_multiSelectList = 13;
JSONFormulaParser.RULE_multiSelectHash = 14;
JSONFormulaParser.RULE_keyvalExpr = 15;
JSONFormulaParser.RULE_bracketSpecifier = 16;
JSONFormulaParser.RULE_slice = 17;
JSONFormulaParser.RULE_functionExpression = 18;
JSONFormulaParser.RULE_functionArg = 19;
JSONFormulaParser.RULE_currentNode = 20;
JSONFormulaParser.RULE_expressionType = 21;
JSONFormulaParser.RULE_literal = 22;
JSONFormulaParser.RULE_identifier = 23;
JSONFormulaParser.RULE_jsonObject = 24;
JSONFormulaParser.RULE_jsonObjectPair = 25;
JSONFormulaParser.RULE_jsonArray = 26;
JSONFormulaParser.RULE_jsonValue = 27;

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


class BinaryExpressionContext extends ExpressionContext {

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

	binary_op() {
	    return this.getTypedRuleContext(Binary_opContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBinaryExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBinaryExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBinaryExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BinaryExpressionContext = BinaryExpressionContext;

class JmesPathContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterJmesPath(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitJmesPath(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitJmesPath(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.JmesPathContext = JmesPathContext;

class TopLevelStringContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	RAW_STRING() {
	    return this.getToken(JSONFormulaParser.RAW_STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterTopLevelString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitTopLevelString(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitTopLevelString(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.TopLevelStringContext = TopLevelStringContext;

class TopLevelIntContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	SIGNED_INT() {
	    return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterTopLevelInt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitTopLevelInt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitTopLevelInt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.TopLevelIntContext = TopLevelIntContext;

class FunctionCallContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	function_call() {
	    return this.getTypedRuleContext(Function_callContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFunctionCall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFunctionCall(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitFunctionCall(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.FunctionCallContext = FunctionCallContext;

class BraceExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBraceExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBraceExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBraceExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.BraceExpressionContext = BraceExpressionContext;

class PostfixContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	postfix_op() {
	    return this.getTypedRuleContext(Postfix_opContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPostfix(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPostfix(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitPostfix(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.PostfixContext = PostfixContext;

class UnaryExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	unary_op() {
	    return this.getTypedRuleContext(Unary_opContext,0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterUnaryExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitUnaryExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitUnaryExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.UnaryExpressionContext = UnaryExpressionContext;

class TopLevelNumberContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NUMBER() {
	    return this.getToken(JSONFormulaParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterTopLevelNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitTopLevelNumber(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitTopLevelNumber(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.TopLevelNumberContext = TopLevelNumberContext;

class Unary_opContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_unary_op;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterUnary_op(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitUnary_op(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitUnary_op(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Binary_opContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_binary_op;
    }

	COMPARATOR() {
	    return this.getToken(JSONFormulaParser.COMPARATOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterBinary_op(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitBinary_op(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitBinary_op(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Postfix_opContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_postfix_op;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPostfix_op(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPostfix_op(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitPostfix_op(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Function_callContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_function_call;
    }

	FUNCTIONS() {
	    return this.getToken(JSONFormulaParser.FUNCTIONS, 0);
	};

	expression_list() {
	    return this.getTypedRuleContext(Expression_listContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterFunction_call(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitFunction_call(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitFunction_call(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ParameterContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_parameter;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterParameter(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitParameter(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitParameter(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Nonempty_expr_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_nonempty_expr_list;
    }

	parameter() {
	    return this.getTypedRuleContext(ParameterContext,0);
	};

	nonempty_expr_list() {
	    return this.getTypedRuleContext(Nonempty_expr_listContext,0);
	};

	parm_separator() {
	    return this.getTypedRuleContext(Parm_separatorContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterNonempty_expr_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitNonempty_expr_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitNonempty_expr_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Expression_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_expression_list;
    }

	nonempty_expr_list() {
	    return this.getTypedRuleContext(Nonempty_expr_listContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterExpression_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitExpression_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitExpression_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Parm_separatorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_parm_separator;
    }


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterParm_separator(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitParm_separator(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitParm_separator(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class JmesPathExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_jmesPathExpression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class PipeExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JmesPathExpressionContext);
	    } else {
	        return this.getTypedRuleContext(JmesPathExpressionContext,i);
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

class IdentifierExpressionContext extends JmesPathExpressionContext {

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

class NotExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

class RawStringExpressionContext extends JmesPathExpressionContext {

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

class ComparisonExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JmesPathExpressionContext);
	    } else {
	        return this.getTypedRuleContext(JmesPathExpressionContext,i);
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

class ParenExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

class BracketExpressionContext extends JmesPathExpressionContext {

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

class OrExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JmesPathExpressionContext);
	    } else {
	        return this.getTypedRuleContext(JmesPathExpressionContext,i);
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

class CurrentNodeExpressionContext extends JmesPathExpressionContext {

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

class ChainExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

class AndExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JmesPathExpressionContext);
	    } else {
	        return this.getTypedRuleContext(JmesPathExpressionContext,i);
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

class MultiSelectHashExpressionContext extends JmesPathExpressionContext {

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

class WildcardExpressionContext extends JmesPathExpressionContext {

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

class FunctionCallExpressionContext extends JmesPathExpressionContext {

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

class MultiSelectListExpressionContext extends JmesPathExpressionContext {

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

class BracketedExpressionContext extends JmesPathExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

class LiteralExpressionContext extends JmesPathExpressionContext {

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


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ChainedMultiSelectListContext extends ChainedExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectList() {
	    return this.getTypedRuleContext(MultiSelectListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedMultiSelectList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedMultiSelectList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedMultiSelectList(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedMultiSelectListContext = ChainedMultiSelectListContext;

class ChainedWildcardContext extends ChainedExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	wildcard() {
	    return this.getTypedRuleContext(WildcardContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedWildcard(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedWildcard(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedWildcard(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedWildcardContext = ChainedWildcardContext;

class ChainedMultiSelectHashContext extends ChainedExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	multiSelectHash() {
	    return this.getTypedRuleContext(MultiSelectHashContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedMultiSelectHash(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedMultiSelectHash(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedMultiSelectHash(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedMultiSelectHashContext = ChainedMultiSelectHashContext;

class ChainedIdentifierContext extends ChainedExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedIdentifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedIdentifier(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedIdentifierContext = ChainedIdentifierContext;

class ChainedFunctionExpressionContext extends ChainedExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	functionExpression() {
	    return this.getTypedRuleContext(FunctionExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterChainedFunctionExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitChainedFunctionExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof JSONFormulaVisitor ) {
	        return visitor.visitChainedFunctionExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

JSONFormulaParser.ChainedFunctionExpressionContext = ChainedFunctionExpressionContext;

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

	jmesPathExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(JmesPathExpressionContext);
	    } else {
	        return this.getTypedRuleContext(JmesPathExpressionContext,i);
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

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
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

	ROOT() {
	    return this.getToken(JSONFormulaParser.ROOT, 0);
	};

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
JSONFormulaParser.Unary_opContext = Unary_opContext; 
JSONFormulaParser.Binary_opContext = Binary_opContext; 
JSONFormulaParser.Postfix_opContext = Postfix_opContext; 
JSONFormulaParser.Function_callContext = Function_callContext; 
JSONFormulaParser.ParameterContext = ParameterContext; 
JSONFormulaParser.Nonempty_expr_listContext = Nonempty_expr_listContext; 
JSONFormulaParser.Expression_listContext = Expression_listContext; 
JSONFormulaParser.Parm_separatorContext = Parm_separatorContext; 
JSONFormulaParser.JmesPathExpressionContext = JmesPathExpressionContext; 
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
JSONFormulaParser.ExpressionTypeContext = ExpressionTypeContext; 
JSONFormulaParser.LiteralContext = LiteralContext; 
JSONFormulaParser.IdentifierContext = IdentifierContext; 
JSONFormulaParser.JsonObjectContext = JsonObjectContext; 
JSONFormulaParser.JsonObjectPairContext = JsonObjectPairContext; 
JSONFormulaParser.JsonArrayContext = JsonArrayContext; 
JSONFormulaParser.JsonValueContext = JsonValueContext; 

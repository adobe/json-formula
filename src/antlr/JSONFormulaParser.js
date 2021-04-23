// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONFormulaListener from './JSONFormulaListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003%\u0138\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003Q\n\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003Y\n\u0003",
    "\f\u0003\u000e\u0003\\\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0007\tr\n\t\f\t\u000e\tu\u000b\t\u0003\n",
    "\u0003\n\u0005\ny\n\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003",
    "\f\u0007\f\u0080\n\f\f\f\u000e\f\u0083\u000b\f\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u0095\n\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u00a8\n\r",
    "\f\r\u000e\r\u00ab\u000b\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u00b2\n\u000e\u0003\u000f\u0003\u000f",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010\u00ba\n",
    "\u0010\f\u0010\u000e\u0010\u00bd\u000b\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u00c5\n",
    "\u0011\f\u0011\u000e\u0011\u00c8\u000b\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0005\u0013\u00e0\n\u0013\u0003\u0014\u0005",
    "\u0014\u00e3\n\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u00e7\n\u0014",
    "\u0003\u0014\u0003\u0014\u0005\u0014\u00eb\n\u0014\u0005\u0014\u00ed",
    "\n\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0007\u0015\u00f4\n\u0015\f\u0015\u000e\u0015\u00f7\u000b\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u00fe",
    "\n\u0015\u0003\u0016\u0003\u0016\u0005\u0016\u0102\n\u0016\u0003\u0017",
    "\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0019\u0003\u0019",
    "\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b",
    "\u0003\u001b\u0003\u001b\u0007\u001b\u0113\n\u001b\f\u001b\u000e\u001b",
    "\u0116\u000b\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0005",
    "\u001b\u011c\n\u001b\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c",
    "\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0007\u001d\u0126\n",
    "\u001d\f\u001d\u000e\u001d\u0129\u000b\u001d\u0003\u001d\u0003\u001d",
    "\u0003\u001d\u0003\u001d\u0005\u001d\u012f\n\u001d\u0003\u001e\u0003",
    "\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0005\u001e\u0136\n\u001e",
    "\u0003\u001e\u0002\u0005\u0004\u0010\u0018\u001f\u0002\u0004\u0006\b",
    "\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.",
    "02468:\u0002\u0006\u0003\u0002\u0006\u0007\u0004\u0002\u0006\f\u001f",
    "\u001f\u0003\u0002!#\u0004\u0002\u001c\u001c$$\u0002\u014f\u0002<\u0003",
    "\u0002\u0002\u0002\u0004P\u0003\u0002\u0002\u0002\u0006]\u0003\u0002",
    "\u0002\u0002\b_\u0003\u0002\u0002\u0002\na\u0003\u0002\u0002\u0002\f",
    "c\u0003\u0002\u0002\u0002\u000eh\u0003\u0002\u0002\u0002\u0010j\u0003",
    "\u0002\u0002\u0002\u0012x\u0003\u0002\u0002\u0002\u0014z\u0003\u0002",
    "\u0002\u0002\u0016|\u0003\u0002\u0002\u0002\u0018\u0094\u0003\u0002",
    "\u0002\u0002\u001a\u00b1\u0003\u0002\u0002\u0002\u001c\u00b3\u0003\u0002",
    "\u0002\u0002\u001e\u00b5\u0003\u0002\u0002\u0002 \u00c0\u0003\u0002",
    "\u0002\u0002\"\u00cb\u0003\u0002\u0002\u0002$\u00df\u0003\u0002\u0002",
    "\u0002&\u00e2\u0003\u0002\u0002\u0002(\u00fd\u0003\u0002\u0002\u0002",
    "*\u0101\u0003\u0002\u0002\u0002,\u0103\u0003\u0002\u0002\u0002.\u0105",
    "\u0003\u0002\u0002\u00020\u0108\u0003\u0002\u0002\u00022\u010c\u0003",
    "\u0002\u0002\u00024\u011b\u0003\u0002\u0002\u00026\u011d\u0003\u0002",
    "\u0002\u00028\u012e\u0003\u0002\u0002\u0002:\u0135\u0003\u0002\u0002",
    "\u0002<=\u0005\u0004\u0003\u0002=>\u0007\u0002\u0002\u0003>\u0003\u0003",
    "\u0002\u0002\u0002?@\b\u0003\u0001\u0002@Q\u0007\u001c\u0002\u0002A",
    "Q\u0007\u001d\u0002\u0002BQ\u0007 \u0002\u0002CD\u0005\u0006\u0004\u0002",
    "DE\u0005\u0004\u0003\bEQ\u0003\u0002\u0002\u0002FG\u0007\u0003\u0002",
    "\u0002GH\u0005\u0004\u0003\u0002HI\u0007\u0004\u0002\u0002IQ\u0003\u0002",
    "\u0002\u0002JQ\u0005\f\u0007\u0002KL\u0005\u0018\r\u0002LM\u0007\u0005",
    "\u0002\u0002MN\u0005\u0016\f\u0002NQ\u0003\u0002\u0002\u0002OQ\u0005",
    "\u0018\r\u0002P?\u0003\u0002\u0002\u0002PA\u0003\u0002\u0002\u0002P",
    "B\u0003\u0002\u0002\u0002PC\u0003\u0002\u0002\u0002PF\u0003\u0002\u0002",
    "\u0002PJ\u0003\u0002\u0002\u0002PK\u0003\u0002\u0002\u0002PO\u0003\u0002",
    "\u0002\u0002QZ\u0003\u0002\u0002\u0002RS\f\t\u0002\u0002ST\u0005\b\u0005",
    "\u0002TU\u0005\u0004\u0003\nUY\u0003\u0002\u0002\u0002VW\f\u0007\u0002",
    "\u0002WY\u0005\n\u0006\u0002XR\u0003\u0002\u0002\u0002XV\u0003\u0002",
    "\u0002\u0002Y\\\u0003\u0002\u0002\u0002ZX\u0003\u0002\u0002\u0002Z[",
    "\u0003\u0002\u0002\u0002[\u0005\u0003\u0002\u0002\u0002\\Z\u0003\u0002",
    "\u0002\u0002]^\t\u0002\u0002\u0002^\u0007\u0003\u0002\u0002\u0002_`",
    "\t\u0003\u0002\u0002`\t\u0003\u0002\u0002\u0002ab\u0007\r\u0002\u0002",
    "b\u000b\u0003\u0002\u0002\u0002cd\u0007\u001e\u0002\u0002de\u0007\u0003",
    "\u0002\u0002ef\u0005\u0012\n\u0002fg\u0007\u0004\u0002\u0002g\r\u0003",
    "\u0002\u0002\u0002hi\u0005\u0004\u0003\u0002i\u000f\u0003\u0002\u0002",
    "\u0002jk\b\t\u0001\u0002kl\u0005\u000e\b\u0002ls\u0003\u0002\u0002\u0002",
    "mn\f\u0003\u0002\u0002no\u0005\u0014\u000b\u0002op\u0005\u000e\b\u0002",
    "pr\u0003\u0002\u0002\u0002qm\u0003\u0002\u0002\u0002ru\u0003\u0002\u0002",
    "\u0002sq\u0003\u0002\u0002\u0002st\u0003\u0002\u0002\u0002t\u0011\u0003",
    "\u0002\u0002\u0002us\u0003\u0002\u0002\u0002vy\u0003\u0002\u0002\u0002",
    "wy\u0005\u0010\t\u0002xv\u0003\u0002\u0002\u0002xw\u0003\u0002\u0002",
    "\u0002y\u0013\u0003\u0002\u0002\u0002z{\u0007\u000e\u0002\u0002{\u0015",
    "\u0003\u0002\u0002\u0002|\u0081\u0007\"\u0002\u0002}~\u0007\u000f\u0002",
    "\u0002~\u0080\u0007\"\u0002\u0002\u007f}\u0003\u0002\u0002\u0002\u0080",
    "\u0083\u0003\u0002\u0002\u0002\u0081\u007f\u0003\u0002\u0002\u0002\u0081",
    "\u0082\u0003\u0002\u0002\u0002\u0082\u0017\u0003\u0002\u0002\u0002\u0083",
    "\u0081\u0003\u0002\u0002\u0002\u0084\u0085\b\r\u0001\u0002\u0085\u0095",
    "\u0005$\u0013\u0002\u0086\u0095\u00052\u001a\u0002\u0087\u0088\u0007",
    "\u0012\u0002\u0002\u0088\u0095\u0005\u0018\r\f\u0089\u008a\u0007\u0003",
    "\u0002\u0002\u008a\u008b\u0005\u0018\r\u0002\u008b\u008c\u0007\u0004",
    "\u0002\u0002\u008c\u0095\u0003\u0002\u0002\u0002\u008d\u0095\u0005\u001c",
    "\u000f\u0002\u008e\u0095\u0005\u001e\u0010\u0002\u008f\u0095\u0005 ",
    "\u0011\u0002\u0090\u0095\u00050\u0019\u0002\u0091\u0095\u0005(\u0015",
    "\u0002\u0092\u0095\u0007 \u0002\u0002\u0093\u0095\u0005,\u0017\u0002",
    "\u0094\u0084\u0003\u0002\u0002\u0002\u0094\u0086\u0003\u0002\u0002\u0002",
    "\u0094\u0087\u0003\u0002\u0002\u0002\u0094\u0089\u0003\u0002\u0002\u0002",
    "\u0094\u008d\u0003\u0002\u0002\u0002\u0094\u008e\u0003\u0002\u0002\u0002",
    "\u0094\u008f\u0003\u0002\u0002\u0002\u0094\u0090\u0003\u0002\u0002\u0002",
    "\u0094\u0091\u0003\u0002\u0002\u0002\u0094\u0092\u0003\u0002\u0002\u0002",
    "\u0094\u0093\u0003\u0002\u0002\u0002\u0095\u00a9\u0003\u0002\u0002\u0002",
    "\u0096\u0097\f\u0010\u0002\u0002\u0097\u0098\u0007\u001f\u0002\u0002",
    "\u0098\u00a8\u0005\u0018\r\u0011\u0099\u009a\f\u000f\u0002\u0002\u009a",
    "\u009b\u0007\u0010\u0002\u0002\u009b\u00a8\u0005\u0018\r\u0010\u009c",
    "\u009d\f\u000e\u0002\u0002\u009d\u009e\u0007\u0011\u0002\u0002\u009e",
    "\u00a8\u0005\u0018\r\u000f\u009f\u00a0\f\u0005\u0002\u0002\u00a0\u00a1",
    "\u0007\u0013\u0002\u0002\u00a1\u00a8\u0005\u0018\r\u0006\u00a2\u00a3",
    "\f\u0013\u0002\u0002\u00a3\u00a4\u0007\u000f\u0002\u0002\u00a4\u00a8",
    "\u0005\u001a\u000e\u0002\u00a5\u00a6\f\u0012\u0002\u0002\u00a6\u00a8",
    "\u0005$\u0013\u0002\u00a7\u0096\u0003\u0002\u0002\u0002\u00a7\u0099",
    "\u0003\u0002\u0002\u0002\u00a7\u009c\u0003\u0002\u0002\u0002\u00a7\u009f",
    "\u0003\u0002\u0002\u0002\u00a7\u00a2\u0003\u0002\u0002\u0002\u00a7\u00a5",
    "\u0003\u0002\u0002\u0002\u00a8\u00ab\u0003\u0002\u0002\u0002\u00a9\u00a7",
    "\u0003\u0002\u0002\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002\u00aa\u0019",
    "\u0003\u0002\u0002\u0002\u00ab\u00a9\u0003\u0002\u0002\u0002\u00ac\u00b2",
    "\u00052\u001a\u0002\u00ad\u00b2\u0005\u001e\u0010\u0002\u00ae\u00b2",
    "\u0005 \u0011\u0002\u00af\u00b2\u0005(\u0015\u0002\u00b0\u00b2\u0005",
    "\u001c\u000f\u0002\u00b1\u00ac\u0003\u0002\u0002\u0002\u00b1\u00ad\u0003",
    "\u0002\u0002\u0002\u00b1\u00ae\u0003\u0002\u0002\u0002\u00b1\u00af\u0003",
    "\u0002\u0002\u0002\u00b1\u00b0\u0003\u0002\u0002\u0002\u00b2\u001b\u0003",
    "\u0002\u0002\u0002\u00b3\u00b4\u0007\n\u0002\u0002\u00b4\u001d\u0003",
    "\u0002\u0002\u0002\u00b5\u00b6\u0007\u0014\u0002\u0002\u00b6\u00bb\u0005",
    "\u0018\r\u0002\u00b7\u00b8\u0007\u000e\u0002\u0002\u00b8\u00ba\u0005",
    "\u0018\r\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00ba\u00bd\u0003",
    "\u0002\u0002\u0002\u00bb\u00b9\u0003\u0002\u0002\u0002\u00bb\u00bc\u0003",
    "\u0002\u0002\u0002\u00bc\u00be\u0003\u0002\u0002\u0002\u00bd\u00bb\u0003",
    "\u0002\u0002\u0002\u00be\u00bf\u0007\u0015\u0002\u0002\u00bf\u001f\u0003",
    "\u0002\u0002\u0002\u00c0\u00c1\u0007\u0016\u0002\u0002\u00c1\u00c6\u0005",
    "\"\u0012\u0002\u00c2\u00c3\u0007\u000e\u0002\u0002\u00c3\u00c5\u0005",
    "\"\u0012\u0002\u00c4\u00c2\u0003\u0002\u0002\u0002\u00c5\u00c8\u0003",
    "\u0002\u0002\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c6\u00c7\u0003",
    "\u0002\u0002\u0002\u00c7\u00c9\u0003\u0002\u0002\u0002\u00c8\u00c6\u0003",
    "\u0002\u0002\u0002\u00c9\u00ca\u0007\u0017\u0002\u0002\u00ca!\u0003",
    "\u0002\u0002\u0002\u00cb\u00cc\u00052\u001a\u0002\u00cc\u00cd\u0007",
    "\u0018\u0002\u0002\u00cd\u00ce\u0005\u0018\r\u0002\u00ce#\u0003\u0002",
    "\u0002\u0002\u00cf\u00d0\u0007\u0014\u0002\u0002\u00d0\u00d1\u0007\u001c",
    "\u0002\u0002\u00d1\u00e0\u0007\u0015\u0002\u0002\u00d2\u00d3\u0007\u0014",
    "\u0002\u0002\u00d3\u00d4\u0007\n\u0002\u0002\u00d4\u00e0\u0007\u0015",
    "\u0002\u0002\u00d5\u00d6\u0007\u0014\u0002\u0002\u00d6\u00d7\u0005&",
    "\u0014\u0002\u00d7\u00d8\u0007\u0015\u0002\u0002\u00d8\u00e0\u0003\u0002",
    "\u0002\u0002\u00d9\u00da\u0007\u0014\u0002\u0002\u00da\u00e0\u0007\u0015",
    "\u0002\u0002\u00db\u00dc\u0007\u0019\u0002\u0002\u00dc\u00dd\u0005\u0018",
    "\r\u0002\u00dd\u00de\u0007\u0015\u0002\u0002\u00de\u00e0\u0003\u0002",
    "\u0002\u0002\u00df\u00cf\u0003\u0002\u0002\u0002\u00df\u00d2\u0003\u0002",
    "\u0002\u0002\u00df\u00d5\u0003\u0002\u0002\u0002\u00df\u00d9\u0003\u0002",
    "\u0002\u0002\u00df\u00db\u0003\u0002\u0002\u0002\u00e0%\u0003\u0002",
    "\u0002\u0002\u00e1\u00e3\u0007\u001c\u0002\u0002\u00e2\u00e1\u0003\u0002",
    "\u0002\u0002\u00e2\u00e3\u0003\u0002\u0002\u0002\u00e3\u00e4\u0003\u0002",
    "\u0002\u0002\u00e4\u00e6\u0007\u0018\u0002\u0002\u00e5\u00e7\u0007\u001c",
    "\u0002\u0002\u00e6\u00e5\u0003\u0002\u0002\u0002\u00e6\u00e7\u0003\u0002",
    "\u0002\u0002\u00e7\u00ec\u0003\u0002\u0002\u0002\u00e8\u00ea\u0007\u0018",
    "\u0002\u0002\u00e9\u00eb\u0007\u001c\u0002\u0002\u00ea\u00e9\u0003\u0002",
    "\u0002\u0002\u00ea\u00eb\u0003\u0002\u0002\u0002\u00eb\u00ed\u0003\u0002",
    "\u0002\u0002\u00ec\u00e8\u0003\u0002\u0002\u0002\u00ec\u00ed\u0003\u0002",
    "\u0002\u0002\u00ed\'\u0003\u0002\u0002\u0002\u00ee\u00ef\u0007\"\u0002",
    "\u0002\u00ef\u00f0\u0007\u0003\u0002\u0002\u00f0\u00f5\u0005*\u0016",
    "\u0002\u00f1\u00f2\u0007\u000e\u0002\u0002\u00f2\u00f4\u0005*\u0016",
    "\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002\u00f4\u00f7\u0003\u0002\u0002",
    "\u0002\u00f5\u00f3\u0003\u0002\u0002\u0002\u00f5\u00f6\u0003\u0002\u0002",
    "\u0002\u00f6\u00f8\u0003\u0002\u0002\u0002\u00f7\u00f5\u0003\u0002\u0002",
    "\u0002\u00f8\u00f9\u0007\u0004\u0002\u0002\u00f9\u00fe\u0003\u0002\u0002",
    "\u0002\u00fa\u00fb\u0007\"\u0002\u0002\u00fb\u00fc\u0007\u0003\u0002",
    "\u0002\u00fc\u00fe\u0007\u0004\u0002\u0002\u00fd\u00ee\u0003\u0002\u0002",
    "\u0002\u00fd\u00fa\u0003\u0002\u0002\u0002\u00fe)\u0003\u0002\u0002",
    "\u0002\u00ff\u0102\u0005\u0018\r\u0002\u0100\u0102\u0005.\u0018\u0002",
    "\u0101\u00ff\u0003\u0002\u0002\u0002\u0101\u0100\u0003\u0002\u0002\u0002",
    "\u0102+\u0003\u0002\u0002\u0002\u0103\u0104\u0007\u001a\u0002\u0002",
    "\u0104-\u0003\u0002\u0002\u0002\u0105\u0106\u0007\t\u0002\u0002\u0106",
    "\u0107\u0005\u0018\r\u0002\u0107/\u0003\u0002\u0002\u0002\u0108\u0109",
    "\u0007\u001b\u0002\u0002\u0109\u010a\u0005:\u001e\u0002\u010a\u010b",
    "\u0007\u001b\u0002\u0002\u010b1\u0003\u0002\u0002\u0002\u010c\u010d",
    "\t\u0004\u0002\u0002\u010d3\u0003\u0002\u0002\u0002\u010e\u010f\u0007",
    "\u0016\u0002\u0002\u010f\u0114\u00056\u001c\u0002\u0110\u0111\u0007",
    "\u000e\u0002\u0002\u0111\u0113\u00056\u001c\u0002\u0112\u0110\u0003",
    "\u0002\u0002\u0002\u0113\u0116\u0003\u0002\u0002\u0002\u0114\u0112\u0003",
    "\u0002\u0002\u0002\u0114\u0115\u0003\u0002\u0002\u0002\u0115\u0117\u0003",
    "\u0002\u0002\u0002\u0116\u0114\u0003\u0002\u0002\u0002\u0117\u0118\u0007",
    "\u0017\u0002\u0002\u0118\u011c\u0003\u0002\u0002\u0002\u0119\u011a\u0007",
    "\u0016\u0002\u0002\u011a\u011c\u0007\u0017\u0002\u0002\u011b\u010e\u0003",
    "\u0002\u0002\u0002\u011b\u0119\u0003\u0002\u0002\u0002\u011c5\u0003",
    "\u0002\u0002\u0002\u011d\u011e\u0007#\u0002\u0002\u011e\u011f\u0007",
    "\u0018\u0002\u0002\u011f\u0120\u0005:\u001e\u0002\u01207\u0003\u0002",
    "\u0002\u0002\u0121\u0122\u0007\u0014\u0002\u0002\u0122\u0127\u0005:",
    "\u001e\u0002\u0123\u0124\u0007\u000e\u0002\u0002\u0124\u0126\u0005:",
    "\u001e\u0002\u0125\u0123\u0003\u0002\u0002\u0002\u0126\u0129\u0003\u0002",
    "\u0002\u0002\u0127\u0125\u0003\u0002\u0002\u0002\u0127\u0128\u0003\u0002",
    "\u0002\u0002\u0128\u012a\u0003\u0002\u0002\u0002\u0129\u0127\u0003\u0002",
    "\u0002\u0002\u012a\u012b\u0007\u0015\u0002\u0002\u012b\u012f\u0003\u0002",
    "\u0002\u0002\u012c\u012d\u0007\u0014\u0002\u0002\u012d\u012f\u0007\u0015",
    "\u0002\u0002\u012e\u0121\u0003\u0002\u0002\u0002\u012e\u012c\u0003\u0002",
    "\u0002\u0002\u012f9\u0003\u0002\u0002\u0002\u0130\u0136\u0007#\u0002",
    "\u0002\u0131\u0136\t\u0005\u0002\u0002\u0132\u0136\u00054\u001b\u0002",
    "\u0133\u0136\u00058\u001d\u0002\u0134\u0136\u0007!\u0002\u0002\u0135",
    "\u0130\u0003\u0002\u0002\u0002\u0135\u0131\u0003\u0002\u0002\u0002\u0135",
    "\u0132\u0003\u0002\u0002\u0002\u0135\u0133\u0003\u0002\u0002\u0002\u0135",
    "\u0134\u0003\u0002\u0002\u0002\u0136;\u0003\u0002\u0002\u0002\u001b",
    "PXZsx\u0081\u0094\u00a7\u00a9\u00b1\u00bb\u00c6\u00df\u00e2\u00e6\u00ea",
    "\u00ec\u00f5\u00fd\u0101\u0114\u011b\u0127\u012e\u0135"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class JSONFormulaParser extends antlr4.Parser {

    static grammarFileName = "JSONFormula.g4";
    static literalNames = [ null, "'('", "')'", "'.@'", "'+'", "'-'", "'<>'", 
                            "'&'", "'*'", "'/'", "'^'", "'%'", "','", "'.'", 
                            "'&&'", "'||'", "'!'", "'|'", "'['", "']'", 
                            "'{'", "'}'", "':'", "'[?'", "'@'", "'`'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, "SIGNED_INT", "NUMBER", "FUNCTIONS", 
                             "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", 
                             "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", 
                             "WS" ];
    static ruleNames = [ "formula", "expression", "unary_op", "binary_op", 
                         "postfix_op", "function_call", "parameter", "nonempty_expr_list", 
                         "expression_list", "parm_separator", "propertyExpression", 
                         "jmesPathExpression", "chainedExpression", "wildcard", 
                         "multiSelectList", "multiSelectHash", "keyvalExpr", 
                         "bracketSpecifier", "slice", "functionExpression", 
                         "functionArg", "currentNode", "expressionType", 
                         "literal", "identifier", "jsonObject", "jsonObjectPair", 
                         "jsonArray", "jsonValue" ];

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
    	case 11:
    	    		return this.jmesPathExpression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 7);
    		case 1:
    			return this.precpred(this._ctx, 5);
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
	        this.state = 58;
	        this.expression(0);
	        this.state = 59;
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
	        this.state = 78;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new TopLevelIntContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 62;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            break;

	        case 2:
	            localctx = new TopLevelNumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 63;
	            this.match(JSONFormulaParser.NUMBER);
	            break;

	        case 3:
	            localctx = new TopLevelStringContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 64;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 4:
	            localctx = new UnaryExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 65;
	            this.unary_op();
	            this.state = 66;
	            this.expression(6);
	            break;

	        case 5:
	            localctx = new BraceExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 68;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 69;
	            this.expression(0);
	            this.state = 70;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 6:
	            localctx = new FunctionCallContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 72;
	            this.function_call();
	            break;

	        case 7:
	            localctx = new PropExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 73;
	            this.jmesPathExpression(0);
	            this.state = 74;
	            this.match(JSONFormulaParser.T__2);
	            this.state = 75;
	            this.propertyExpression();
	            break;

	        case 8:
	            localctx = new JmesPathContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 77;
	            this.jmesPathExpression(0);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 88;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 86;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 80;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 81;
	                    this.binary_op();
	                    this.state = 82;
	                    this.expression(8);
	                    break;

	                case 2:
	                    localctx = new PostfixContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
	                    this.state = 84;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 85;
	                    this.postfix_op();
	                    break;

	                } 
	            }
	            this.state = 90;
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
	        this.state = 91;
	        _la = this._input.LA(1);
	        if(!(_la===JSONFormulaParser.T__3 || _la===JSONFormulaParser.T__4)) {
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
	        this.state = 93;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << JSONFormulaParser.T__3) | (1 << JSONFormulaParser.T__4) | (1 << JSONFormulaParser.T__5) | (1 << JSONFormulaParser.T__6) | (1 << JSONFormulaParser.T__7) | (1 << JSONFormulaParser.T__8) | (1 << JSONFormulaParser.T__9) | (1 << JSONFormulaParser.COMPARATOR))) !== 0))) {
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
	        this.state = 95;
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



	function_call() {
	    let localctx = new Function_callContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, JSONFormulaParser.RULE_function_call);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 97;
	        this.match(JSONFormulaParser.FUNCTIONS);
	        this.state = 98;
	        this.match(JSONFormulaParser.T__0);
	        this.state = 99;
	        this.expression_list();
	        this.state = 100;
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
	        this.state = 102;
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
	        this.state = 105;
	        this.parameter();
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 113;
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
	                this.state = 107;
	                if (!( this.precpred(this._ctx, 1))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                }
	                this.state = 108;
	                this.parm_separator();
	                this.state = 109;
	                this.parameter(); 
	            }
	            this.state = 115;
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
	        this.state = 118;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__1:
	            this.enterOuterAlt(localctx, 1);

	            break;
	        case JSONFormulaParser.T__0:
	        case JSONFormulaParser.T__3:
	        case JSONFormulaParser.T__4:
	        case JSONFormulaParser.T__7:
	        case JSONFormulaParser.T__15:
	        case JSONFormulaParser.T__17:
	        case JSONFormulaParser.T__19:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.T__23:
	        case JSONFormulaParser.T__24:
	        case JSONFormulaParser.SIGNED_INT:
	        case JSONFormulaParser.NUMBER:
	        case JSONFormulaParser.FUNCTIONS:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 117;
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
	        this.state = 120;
	        this.match(JSONFormulaParser.T__11);
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



	propertyExpression() {
	    let localctx = new PropertyExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, JSONFormulaParser.RULE_propertyExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 122;
	        this.match(JSONFormulaParser.NAME);
	        this.state = 127;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 123;
	                this.match(JSONFormulaParser.T__12);
	                this.state = 124;
	                this.match(JSONFormulaParser.NAME); 
	            }
	            this.state = 129;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
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


	jmesPathExpression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new JmesPathExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 22;
	    this.enterRecursionRule(localctx, 22, JSONFormulaParser.RULE_jmesPathExpression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 146;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 131;
	            this.bracketSpecifier();
	            break;

	        case 2:
	            localctx = new IdentifierExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 132;
	            this.identifier();
	            break;

	        case 3:
	            localctx = new NotExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 133;
	            this.match(JSONFormulaParser.T__15);
	            this.state = 134;
	            this.jmesPathExpression(10);
	            break;

	        case 4:
	            localctx = new ParenExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 135;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 136;
	            this.jmesPathExpression(0);
	            this.state = 137;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 5:
	            localctx = new WildcardExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 139;
	            this.wildcard();
	            break;

	        case 6:
	            localctx = new MultiSelectListExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 140;
	            this.multiSelectList();
	            break;

	        case 7:
	            localctx = new MultiSelectHashExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 141;
	            this.multiSelectHash();
	            break;

	        case 8:
	            localctx = new LiteralExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 142;
	            this.literal();
	            break;

	        case 9:
	            localctx = new FunctionCallExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 143;
	            this.functionExpression();
	            break;

	        case 10:
	            localctx = new RawStringExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 144;
	            this.match(JSONFormulaParser.RAW_STRING);
	            break;

	        case 11:
	            localctx = new CurrentNodeExpressionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 145;
	            this.currentNode();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 167;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 165;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ComparisonExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 148;
	                    if (!( this.precpred(this._ctx, 14))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
	                    }
	                    this.state = 149;
	                    this.match(JSONFormulaParser.COMPARATOR);
	                    this.state = 150;
	                    this.jmesPathExpression(15);
	                    break;

	                case 2:
	                    localctx = new AndExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 151;
	                    if (!( this.precpred(this._ctx, 13))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
	                    }
	                    this.state = 152;
	                    this.match(JSONFormulaParser.T__13);
	                    this.state = 153;
	                    this.jmesPathExpression(14);
	                    break;

	                case 3:
	                    localctx = new OrExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 154;
	                    if (!( this.precpred(this._ctx, 12))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
	                    }
	                    this.state = 155;
	                    this.match(JSONFormulaParser.T__14);
	                    this.state = 156;
	                    this.jmesPathExpression(13);
	                    break;

	                case 4:
	                    localctx = new PipeExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 157;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 158;
	                    this.match(JSONFormulaParser.T__16);
	                    this.state = 159;
	                    this.jmesPathExpression(4);
	                    break;

	                case 5:
	                    localctx = new ChainExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 160;
	                    if (!( this.precpred(this._ctx, 17))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
	                    }
	                    this.state = 161;
	                    this.match(JSONFormulaParser.T__12);
	                    this.state = 162;
	                    this.chainedExpression();
	                    break;

	                case 6:
	                    localctx = new BracketedExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
	                    this.state = 163;
	                    if (!( this.precpred(this._ctx, 16))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
	                    }
	                    this.state = 164;
	                    this.bracketSpecifier();
	                    break;

	                } 
	            }
	            this.state = 169;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
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
	    this.enterRule(localctx, 24, JSONFormulaParser.RULE_chainedExpression);
	    try {
	        this.state = 175;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ChainedIdentifierContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 170;
	            this.identifier();
	            break;

	        case 2:
	            localctx = new ChainedMultiSelectListContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 171;
	            this.multiSelectList();
	            break;

	        case 3:
	            localctx = new ChainedMultiSelectHashContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 172;
	            this.multiSelectHash();
	            break;

	        case 4:
	            localctx = new ChainedFunctionExpressionContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 173;
	            this.functionExpression();
	            break;

	        case 5:
	            localctx = new ChainedWildcardContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 174;
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
	    this.enterRule(localctx, 26, JSONFormulaParser.RULE_wildcard);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 177;
	        this.match(JSONFormulaParser.T__7);
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
	    this.enterRule(localctx, 28, JSONFormulaParser.RULE_multiSelectList);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 179;
	        this.match(JSONFormulaParser.T__17);
	        this.state = 180;
	        this.jmesPathExpression(0);
	        this.state = 185;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__11) {
	            this.state = 181;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 182;
	            this.jmesPathExpression(0);
	            this.state = 187;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 188;
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



	multiSelectHash() {
	    let localctx = new MultiSelectHashContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, JSONFormulaParser.RULE_multiSelectHash);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 190;
	        this.match(JSONFormulaParser.T__19);
	        this.state = 191;
	        this.keyvalExpr();
	        this.state = 196;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===JSONFormulaParser.T__11) {
	            this.state = 192;
	            this.match(JSONFormulaParser.T__11);
	            this.state = 193;
	            this.keyvalExpr();
	            this.state = 198;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 199;
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



	keyvalExpr() {
	    let localctx = new KeyvalExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, JSONFormulaParser.RULE_keyvalExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 201;
	        this.identifier();
	        this.state = 202;
	        this.match(JSONFormulaParser.T__21);
	        this.state = 203;
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
	    this.enterRule(localctx, 34, JSONFormulaParser.RULE_bracketSpecifier);
	    try {
	        this.state = 221;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BracketIndexContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 205;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 206;
	            this.match(JSONFormulaParser.SIGNED_INT);
	            this.state = 207;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            localctx = new BracketStarContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 208;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 209;
	            this.match(JSONFormulaParser.T__7);
	            this.state = 210;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 3:
	            localctx = new BracketSliceContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 211;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 212;
	            this.slice();
	            this.state = 213;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 4:
	            localctx = new BracketFlattenContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 215;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 216;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 5:
	            localctx = new SelectContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 217;
	            this.match(JSONFormulaParser.T__22);
	            this.state = 218;
	            this.jmesPathExpression(0);
	            this.state = 219;
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



	slice() {
	    let localctx = new SliceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, JSONFormulaParser.RULE_slice);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 224;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 223;
	            localctx.start = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 226;
	        this.match(JSONFormulaParser.T__21);
	        this.state = 228;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.SIGNED_INT) {
	            this.state = 227;
	            localctx.stop = this.match(JSONFormulaParser.SIGNED_INT);
	        }

	        this.state = 234;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===JSONFormulaParser.T__21) {
	            this.state = 230;
	            this.match(JSONFormulaParser.T__21);
	            this.state = 232;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===JSONFormulaParser.SIGNED_INT) {
	                this.state = 231;
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
	    this.enterRule(localctx, 38, JSONFormulaParser.RULE_functionExpression);
	    var _la = 0; // Token type
	    try {
	        this.state = 251;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 236;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 237;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 238;
	            this.functionArg();
	            this.state = 243;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__11) {
	                this.state = 239;
	                this.match(JSONFormulaParser.T__11);
	                this.state = 240;
	                this.functionArg();
	                this.state = 245;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 246;
	            this.match(JSONFormulaParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 248;
	            this.match(JSONFormulaParser.NAME);
	            this.state = 249;
	            this.match(JSONFormulaParser.T__0);
	            this.state = 250;
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
	    this.enterRule(localctx, 40, JSONFormulaParser.RULE_functionArg);
	    try {
	        this.state = 255;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.T__0:
	        case JSONFormulaParser.T__7:
	        case JSONFormulaParser.T__15:
	        case JSONFormulaParser.T__17:
	        case JSONFormulaParser.T__19:
	        case JSONFormulaParser.T__22:
	        case JSONFormulaParser.T__23:
	        case JSONFormulaParser.T__24:
	        case JSONFormulaParser.RAW_STRING:
	        case JSONFormulaParser.JSON_CONSTANT:
	        case JSONFormulaParser.NAME:
	        case JSONFormulaParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 253;
	            this.jmesPathExpression(0);
	            break;
	        case JSONFormulaParser.T__6:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 254;
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
	    this.enterRule(localctx, 42, JSONFormulaParser.RULE_currentNode);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 257;
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
	    this.enterRule(localctx, 44, JSONFormulaParser.RULE_expressionType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 259;
	        this.match(JSONFormulaParser.T__6);
	        this.state = 260;
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
	    this.enterRule(localctx, 46, JSONFormulaParser.RULE_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 262;
	        this.match(JSONFormulaParser.T__24);
	        this.state = 263;
	        this.jsonValue();
	        this.state = 264;
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
	    this.enterRule(localctx, 48, JSONFormulaParser.RULE_identifier);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 266;
	        _la = this._input.LA(1);
	        if(!(((((_la - 31)) & ~0x1f) == 0 && ((1 << (_la - 31)) & ((1 << (JSONFormulaParser.JSON_CONSTANT - 31)) | (1 << (JSONFormulaParser.NAME - 31)) | (1 << (JSONFormulaParser.STRING - 31)))) !== 0))) {
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
	    this.enterRule(localctx, 50, JSONFormulaParser.RULE_jsonObject);
	    var _la = 0; // Token type
	    try {
	        this.state = 281;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 268;
	            this.match(JSONFormulaParser.T__19);
	            this.state = 269;
	            this.jsonObjectPair();
	            this.state = 274;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__11) {
	                this.state = 270;
	                this.match(JSONFormulaParser.T__11);
	                this.state = 271;
	                this.jsonObjectPair();
	                this.state = 276;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 277;
	            this.match(JSONFormulaParser.T__20);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 279;
	            this.match(JSONFormulaParser.T__19);
	            this.state = 280;
	            this.match(JSONFormulaParser.T__20);
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
	    this.enterRule(localctx, 52, JSONFormulaParser.RULE_jsonObjectPair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 283;
	        this.match(JSONFormulaParser.STRING);
	        this.state = 284;
	        this.match(JSONFormulaParser.T__21);
	        this.state = 285;
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
	    this.enterRule(localctx, 54, JSONFormulaParser.RULE_jsonArray);
	    var _la = 0; // Token type
	    try {
	        this.state = 300;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 287;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 288;
	            this.jsonValue();
	            this.state = 293;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===JSONFormulaParser.T__11) {
	                this.state = 289;
	                this.match(JSONFormulaParser.T__11);
	                this.state = 290;
	                this.jsonValue();
	                this.state = 295;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 296;
	            this.match(JSONFormulaParser.T__18);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 298;
	            this.match(JSONFormulaParser.T__17);
	            this.state = 299;
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



	jsonValue() {
	    let localctx = new JsonValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 56, JSONFormulaParser.RULE_jsonValue);
	    var _la = 0; // Token type
	    try {
	        this.state = 307;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case JSONFormulaParser.STRING:
	            localctx = new JsonStringValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 302;
	            this.match(JSONFormulaParser.STRING);
	            break;
	        case JSONFormulaParser.SIGNED_INT:
	        case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
	            localctx = new JsonNumberValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 303;
	            _la = this._input.LA(1);
	            if(!(_la===JSONFormulaParser.SIGNED_INT || _la===JSONFormulaParser.REAL_OR_EXPONENT_NUMBER)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            break;
	        case JSONFormulaParser.T__19:
	            localctx = new JsonObjectValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 304;
	            this.jsonObject();
	            break;
	        case JSONFormulaParser.T__17:
	            localctx = new JsonArrayValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 305;
	            this.jsonArray();
	            break;
	        case JSONFormulaParser.JSON_CONSTANT:
	            localctx = new JsonConstantValueContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 306;
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
JSONFormulaParser.SIGNED_INT = 26;
JSONFormulaParser.NUMBER = 27;
JSONFormulaParser.FUNCTIONS = 28;
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
JSONFormulaParser.RULE_propertyExpression = 10;
JSONFormulaParser.RULE_jmesPathExpression = 11;
JSONFormulaParser.RULE_chainedExpression = 12;
JSONFormulaParser.RULE_wildcard = 13;
JSONFormulaParser.RULE_multiSelectList = 14;
JSONFormulaParser.RULE_multiSelectHash = 15;
JSONFormulaParser.RULE_keyvalExpr = 16;
JSONFormulaParser.RULE_bracketSpecifier = 17;
JSONFormulaParser.RULE_slice = 18;
JSONFormulaParser.RULE_functionExpression = 19;
JSONFormulaParser.RULE_functionArg = 20;
JSONFormulaParser.RULE_currentNode = 21;
JSONFormulaParser.RULE_expressionType = 22;
JSONFormulaParser.RULE_literal = 23;
JSONFormulaParser.RULE_identifier = 24;
JSONFormulaParser.RULE_jsonObject = 25;
JSONFormulaParser.RULE_jsonObjectPair = 26;
JSONFormulaParser.RULE_jsonArray = 27;
JSONFormulaParser.RULE_jsonValue = 28;

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


}

JSONFormulaParser.FunctionCallContext = FunctionCallContext;

class PropExpressionContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	jmesPathExpression() {
	    return this.getTypedRuleContext(JmesPathExpressionContext,0);
	};

	propertyExpression() {
	    return this.getTypedRuleContext(PropertyExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPropExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPropExpression(this);
		}
	}


}

JSONFormulaParser.PropExpressionContext = PropExpressionContext;

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


}



class PropertyExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONFormulaParser.RULE_propertyExpression;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONFormulaParser.NAME);
	    } else {
	        return this.getToken(JSONFormulaParser.NAME, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.enterPropertyExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONFormulaListener ) {
	        listener.exitPropertyExpression(this);
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
JSONFormulaParser.PropertyExpressionContext = PropertyExpressionContext; 
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

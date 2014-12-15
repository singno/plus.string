Plus.string
===

String manipulation extensions for Plus.js javascript library.

#### _.string.capitalize(str)

字符串首字母大写。

	_.string.capitalize('foo');
	=> 'Foo'
	
#### _.string.titleize(str)

字符串所有单词大写。

	_.string.titleize('this is my book');
	=> 'This Is My Book'
	
#### _.string.format(str, data)

简单的字符串模板填充。

	_.string.format('my name is {name}, i am {age} year old.', {
		name: 'jerry',
		age: 12
	});
	=> 'my name is jerry, i am 12 year old.'
	
#### _.string.trim(str) *ecmascript 5*

首尾空白字符过滤。

	_.string.trim(' foo ');
	=> 'foo'
	
#### _.string.trimLeft(str) *ecmascript 5*

首部空白字符过滤。

	_.string.trimLeft(' foo ');
	=> 'foo '

#### _.string.trimRight(str) *ecmascript 5*

尾部空白字符过滤。
	
	_.string.trimLeft(' foo ');
	=> ' foo'
	
#### _.string.clean(str)

过滤掉首尾空白字符，并将字符串中（非首尾）连续的多个空白字符替换为1个。

	_.string.clean('  this   is   my    book ');
	=> 'this is my book'

#### _.string.swapCase(str)

大小写字母互换。

	_.string.swapCase('hELLO');
	=> 'Hello'
	
#### _.string.escapeHTML(str)

html转义。

	_.string.escapeHTML('<>&\'"');
	=> '&lt;&gt;&amp;&#x27;&quot;'
	
#### _.string.unescapeHTML(str)

将转义后的html还原。

	_.string.unescapeHTML('&lt;&gt;&amp;&#x27;&quot;&#162;&#xa2;');
	=> '<>&\'"¢¢'
	
#### _.string.toHTMLEntity(str)

将字符串转换为html实体字符。

	_.string.toHTMLEntity('>&');
	=> '&#62;&#38;'
	
#### _.string.fromHTMLEntity(str)

将html实体转换为常规字符串。

	_.string.fromHTMLEntity('&#62;&#38;'); 
	=> '>&'
	
	
#### _.string.toUnicode(str)

将字符串转换为unicode编码。

	_.string.toUnicode('bar');
	=> '\\u0062\\u0061\\u0072'

#### _.string.fromUnicode(str)

将unicode编码的字符串转换为常规字符串。

	_.string.fromUnicode('\\u0062\\u0061\\u0072');
	=> 'bar' 

#### _.string.reverse(str)

字符串反转。

	_.string.reverse('foobar');
	=> 'raboof'
	
#### _.string.splice(str, index, howmany, substr)

_.string.splice 方法向/从字符串中添加/删除字符串，然后返回新的字符串。

	_.string.splice('foobar', 3, 2, 'ab');
	=> 'fooabr'
	
#### _.string.insert(str, index, substr)

在字符串中`index`的位置插入子字符串。

	_.string.insert('tab', 1, 'c');
	=> 'tcab'
	
#### _.string.camelize(str)

将字符串转换为"驼峰式"。

	_.string.camelize('margin-top');
	=> 'marginTop'
	
#### _.string.classify(str)

将字符串转换为"类名式"。

	_.string.classify('some_class_name');
	=> 'SomeClassName'
	
#### _.string.underscored(str)

将字符串转换为"下划线式"。

	_.string.underscored('margin-top');
	_.string.underscored('marginTop');
	=> 'margin_top'

#### _.string.dasherize(str)

将字符串转换为"连字符式"。

	_.string.dasherize('marginTop');
	=> 'margin-top'
	
#### _.string.humanize(str)

将字符串转换为人类可读的。

	_.string.humanize('  capitalize dash-CamelCase_underscore trim  ');
	=> 'Capitalize dash camel case underscore trim'
	
#### _.string.truncate(str, len, truncateStr)

将超出len长度的字符串截断。

	_.string.truncate('hello world', 5);
	=> 'hello...'
	
#### _.string.repeat(str, count, separator)

重复一个字符串count次。

	_.string.repeat('a', 5);
	=> 'aaaaa'
	
#### _.string.surround(str, wrap)

将字符串用另一字符串`wrap`包裹。

	_.string.surround('me', '$');
	=> $me$

#### _.string.pad(str, len, [padStr], [type])
 
用padStr（默认空格）填充字符串的首尾两边。

	_.pad('foo', 3); // padStr 默认为空格，type默认为'left'
	=> '   foo' 
	_.pad('foo', 3, '$', 'right');
	=> 'foo$$$'
	_.pad('foo', 3, '$', 'both');
	=> '$$$foo$$$'
	
#### _.string.lpad(str, len, padStr)

同`_.pad(str, len, padStr, 'left');`

#### _.string.rpad(str, len, padStr)

同`_.pad(str, len, padStr, 'right');`

#### _.string.lrpad(str, len, padStr)

同`_.pad(str, len, padStr, 'both');`

#### _.string.strRight(str, pattern, [offset])

在str中从左至右搜寻`pattern`字符串，并返回字符串在`pattern`右边的部分。
	
	_.string.strRight('foobarfoobar', 'foo');
	=> 'barfoobar'

#### _.string.strRightBack(str, pattern, [offset])
	
在str中从右至左搜寻`pattern`字符串，并返回字符串在`pattern`右边的部分。

	_.string.strRightBack('f-g-h', '-', 2);	
	=> 'g-h'

#### _.string.strLeft(str, pattern, [offset])

在str中从左至右搜寻`pattern`字符串，并返回字符串在`pattern`左边的部分。
 	
 	_.string.strLeft('foobarfoobar', 'bar');
 	=> 'foo'
 	
#### _.string.strLeftBack(str, pattern, [offset])

在str中从右至左搜寻`pattern`字符串，并返回字符串在`pattern`左边的部分。

	_.string.strLeftBack('f-f-f', '-', 1);
	=> 'f'
	
#### _.string.stripTags(str)

过滤掉string中的html标签。

	_.string.stripTags('<abc>321</abc><input value="a" /><span>123</span>');
	=> '321123'

#### _.string.escapeRegExp(str)

转义正则表达式。

	var str = '.*+?^=!:${}()|[]/\\',
		regexp = new RegExp(_.string.escapeRegExp(str));
		
	regexp.test(str);
	=> true
	
#### _.string.count(str, substr)

计算子字符串在字符串中出现的次数。

	_.string.count('foofoo', 'oo');
	=> 2

#### _.string.isBlank(str);

判断字符串是否空白字符。

	_.string.isBlank('\n');
	=> true
	
#### _.string.startsWith(str, substr)

判断字符串是否以子字符串开头。

	_.string.startsWith('hello world', 'hello');
	=> true
	
#### _.string.endsWith(str, substr)

判断字符串是否以子字符串结尾。

	_.string.endsWith('hello world', 'world');
	=> true

#### _.string.chop(str, step)

将字符串按每组长度为step分为n段。

	_.string.chop('abcefghi', 3);
	=> ['abc', 'efg', 'hi']
	
#### _.string.isUpper(str)

判断字符是否是大写字母。

	_.string.isUpper('ABC');
	=> true
	
#### _.string.isLower(str)

判断字符是否是小写字母。

	_.string.isLower('abc');
	=> true
	
#### _.string.charLength(str)

计算字符串长度。

	_.string.charLength('测1');
	=> 3
	

	



	
	


	

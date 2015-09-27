/*
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

import Types = require('../Types');
import Exception = require('../Exception');
import SystemException = require('./SystemException');


const NAME:string = 'ArgumentException';

class ArgumentException extends SystemException
{

	paramName:string;

	// For simplicity and consistency, lets stick with 1 signature.
	constructor(
		paramName:string,
		message:string = null,
		innerException:Exception = null)
	{
		this.paramName = paramName;
		super(message, innerException);
	}


	protected getName():string
	{
		return NAME;
	}

	toString():string
	{
		var _ = this, pn = _.paramName;
		pn = pn ? ('{' + pn + '} ') : '';

		return '[' + _.name + ': ' + pn + _.message + ']';
	}

}

export = ArgumentException;
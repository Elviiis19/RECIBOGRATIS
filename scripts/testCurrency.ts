import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
// Can't run React code via tsx easily. But we know react-currency-input-field returns a string.
// If it outputs "1200.50", meaning it normalizes to standard js floats. 
// If it outputs "1200,50", it keeps the decimalSeparator. 

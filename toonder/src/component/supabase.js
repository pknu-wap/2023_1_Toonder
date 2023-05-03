import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsxogdtxxerrzpdgyyac.supabase.co/';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeG9nZHR4eGVycnpwZGd5eWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzA4NTQsImV4cCI6MTk5ODQ0Njg1NH0.4ayoRXi9Z0745i2dyqIjvm23CSBRK--iAFspUAy6pOw';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

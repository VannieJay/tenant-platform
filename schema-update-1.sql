-- Add missing columns to profiles table
alter table profiles 
add column if not exists emergency_contact text,
add column if not exists id_type text,
add column if not exists id_number text,
add column if not exists id_document_path text;

-- Create Storage Bucket for Documents
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- RLS for Storage (Tenants can upload their own, Admin can view all)
-- Note: This requires enabling RLS on storage.objects

create policy "Tenants can upload their own documents"
on storage.objects for insert
with check ( bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1] );

create policy "Tenants can view their own documents"
on storage.objects for select
using ( bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1] );

create policy "Admins can view all documents"
on storage.objects for select
using ( bucket_id = 'documents' and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );

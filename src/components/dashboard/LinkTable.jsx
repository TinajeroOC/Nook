'use client'

import {
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { IconExternalLink } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'

import LinkCreateForm from './LinkCreateForm'
import LinkDeleteForm from './LinkDeleteForm'
import LinkEditForm from './LinkEditForm'

export default function LinkTable({ data }) {
  const [links, setLinks] = useState(data.links)

  const columns = [
    { name: 'Title', uid: 'title' },
    { name: 'Description', uid: 'description' },
    { name: 'Visible', uid: 'visible' },
    { name: 'Actions', uid: 'actions' },
  ]

  const renderCell = useCallback(
    (link, columnKey) => {
      const cellValue = link[columnKey]

      switch (columnKey) {
        case 'title':
          return <span className='font-semibold'>{cellValue}</span>
        case 'description':
          return <p className='text-sm'>{cellValue ? cellValue : 'None'}</p>
        case 'visible':
          return (
            <Chip
              className='capitalize'
              color={link.isVisible ? 'success' : 'danger'}
              size='sm'
              variant='flat'
            >
              {link.isVisible ? 'Visible' : 'Hidden'}
            </Chip>
          )
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <Tooltip content='View Link'>
                <Link isExternal href={link.url}>
                  <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                    <IconExternalLink size='20' />
                  </span>
                </Link>
              </Tooltip>
              <LinkEditForm link={link} setLinks={setLinks} />
              <LinkDeleteForm link={link} setLinks={setLinks} />
            </div>
          )
        default:
          return cellValue
      }
    },
    [setLinks]
  )

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-row items-center justify-between gap-2'>
        <h2 className='text-2xl'>Links</h2>
        <LinkCreateForm user={data.user} setLinks={setLinks} />
      </div>
    )
  }, [data, setLinks])

  return (
    <Table topContent={topContent} topContentPlacement='outside'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={links} emptyContent={'Create a link to get started'}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

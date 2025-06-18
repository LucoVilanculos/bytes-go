"use client"
import {type  ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


import { MoreHorizontal } from 'lucide-react';
import { Button } from "../components/ui/button";
import { 
     DropdownMenu,
     DropdownMenuContent, 
     DropdownMenuItem, 
     DropdownMenuLabel,
     DropdownMenuTrigger,
     DropdownMenuSeparator} from '../components/ui/dropdown-menu';

export interface OrderProps {
    orderId: string;
    customerName: string;
    items: Array<{
        name: string;
        itemId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    orderDate: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
       country: string;
       city: string;
    };
    createdAt: Date;
}


export const columns: ColumnDef<OrderProps>[] = [
    {
        accessorKey: 'orderId',
        header: 'Order ID',
    },
    {
        accessorKey: 'customerName',
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
    {
        accessorKey: 'items',
        header: 'Items',
        cell: ({ row }) => (
            <ul>
                {row.original.items.map(item => (
                    <li key={item.itemId}>
                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        ),
    },
    {
        accessorKey: 'totalAmount',
      header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
    {
        accessorKey: 'orderDate',
        header: 'Order Date',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];

export const actionColumn: ColumnDef<OrderProps> = {
      id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.orderId)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }


  /**
import {type  ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from 'lucide-react';
import { Button } from "../components/ui/button";
import { 
     DropdownMenu,
     DropdownMenuContent, 
     DropdownMenuItem, 
     DropdownMenuLabel,
     DropdownMenuTrigger,
     DropdownMenuSeparator} from '../components/ui/dropdown-menu';

export interface OrderProps {
    orderId: string;
    customerName: string;
    items: Array<{
        name: string;
        itemId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    orderDate: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
       country: string;
       city: string;
    };
}

export const data: OrderProps[] = [
    {
        orderId: '12345',
        customerName: 'John Doe',
        items: [
            { name: 'Widget A', itemId: 'a1', quantity: 2, price: 19.99 },
            { name: 'Widget B', itemId: 'b1', quantity: 1, price: 29.99 },
        ],
        totalAmount: 69.97,
        orderDate: '2023-10-01',
        status: 'shipped',
        shippingAddress: {
            country: 'USA',
            city: 'New York',
        },
    },
    // Add more sample data as needed
];




export const columns: ColumnDef<OrderProps>[] = [
    {
        accessorKey: 'orderId',
        header: 'Order ID',
    },
    {
        accessorKey: 'customerName',
        header: 'Customer Name',
    },
    {
        accessorKey: 'items',
        header: 'Items',
        cell: ({ row }) => (
            <ul>
                {row.original.items.map(item => (
                    <li key={item.itemId}>
                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        ),
    },
    {
        accessorKey: 'totalAmount',
      header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
    {
        accessorKey: 'orderDate',
        header: 'Order Date',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];

export const actionColumn: ColumnDef<OrderProps> = {
      id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.orderId)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
 */
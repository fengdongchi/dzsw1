package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeOutStockDetailsInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/24.
 */
public class OutstockdetailInfoAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeOutStockDetailsInfo> stockdetaillist;
    private String outBillCode;
    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> dao;

    public String select(){

            stockdetaillist=dao.queryForPage("from TMeOutStockDetailsInfo u where u.TMeOutStockInfoByOutBillCode.outBillCode =?", page, limit,outBillCode);
            rows=stockdetaillist.size();
            return SUCCESS;

    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TMeOutStockDetailsInfo> getStockdetaillist() {
        return stockdetaillist;
    }

    public void setStockdetaillist(List<TMeOutStockDetailsInfo> stockdetaillist) {
        this.stockdetaillist = stockdetaillist;
    }

    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }
}

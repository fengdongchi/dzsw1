package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/24.
 */
public class InstockdetailInfoAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeInStockDetailsInfo> stockdetaillist;
    private String billCode;
    @Resource
    private BaseDAO<TMeInStockDetailsInfo> dao;

    public String select(){

            stockdetaillist=dao.queryForPage("from TMeInStockDetailsInfo u where u.TMeInStockInfoByBillCode.billCode =?", page, limit,billCode);
            rows=dao.listAll(TMeInStockDetailsInfo.class).size();
            return SUCCESS;

    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
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

    public List<TMeInStockDetailsInfo> getStockdetaillist() {
        return stockdetaillist;
    }

    public void setStockdetaillist(List<TMeInStockDetailsInfo> stockdetaillist) {
        this.stockdetaillist = stockdetaillist;
    }
}

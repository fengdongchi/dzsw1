package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class StockInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeStockInfo> stocklist;
    private String id;
    @Resource
    private BaseDAO<TMeStockInfo> dao;

    public String select(){
        if(null!=id){
            stocklist = dao.queryForPage("from TMeStockInfo u where u.id like\'%" + id + "%\'", page, limit);
            rows = stocklist.size();
            return SUCCESS;
        }
        stocklist=dao.queryForPage("from TMeStockInfo",page,limit);
        rows=dao.queryRecordCount("select count(*) from TMeStockInfo");
        return SUCCESS;
    }

    public List<TMeStockInfo> getStocklist() {
        return stocklist;
    }

    public void setStocklist(List<TMeStockInfo> stocklist) {
        this.stocklist = stocklist;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
}

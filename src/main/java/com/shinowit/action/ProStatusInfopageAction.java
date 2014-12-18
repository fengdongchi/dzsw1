package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/17.
 */
public class ProStatusInfopageAction extends ActionSupport{
    private int page;
    private int limit;
    private int rows;
    private List<TMeProStatusInfo> proslist;
    @Resource
    private BaseDAO<TMeProStatusInfo> dao;

    public String select(){
        proslist=dao.queryForPage("from TMeProStatusInfo",page,limit);
        rows=proslist.size();
        return SUCCESS;
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

    public List<TMeProStatusInfo> getProslist() {
        return proslist;
    }

    public void setProslist(List<TMeProStatusInfo> proslist) {
        this.proslist = proslist;
    }
}
